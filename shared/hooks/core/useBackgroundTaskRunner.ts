import { scheduleNotificationAsync } from "expo-notifications";
import AsyncStorage from "expo-sqlite/kv-store";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import uuid from "react-native-uuid";

import { Process } from "@/core/types";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

import { eventBus } from "@/core/events/EventBus";

import { useBackgroundTasksStore } from "../store";

import { calcAvarageProcessDuration } from "@/shared/utils";
import { setGenerationProcessName } from "../../helpers";

const useBackgroundTaskRunner = () => {
  const appState = useRef<AppStateStatus>(AppState.currentState);

  const {
    tasks,
    createBackgroundTask,
    updateBackgroundTask,
    removeBackgroundTask,
  } = useBackgroundTasksStore();

  useEffect(() => {
    const interval = setInterval(async () => {
      const inProgressTasks = tasks.filter(
        (task) => task.state === "in-progress"
      );

      for (const task of inProgressTasks) {
        const averageDuration = calcAvarageProcessDuration(task.processName);
        if (!averageDuration) continue;
        const elapsed = Date.now() - (task.startTime ?? Date.now());
        const progress = Math.min((elapsed / averageDuration) * 100, 100);

        updateBackgroundTask({ ...task, progress });
      }
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", async (next) => {
      appState.current = next;
      if (next !== "active") {
        const inProgressTasks = tasks.filter(
          (task) => task.state === "in-progress"
        );

        for (const task of inProgressTasks) {
          await scheduleNotificationAsync({
            content: {
              title: task.processName,
              body: `En progreso: ${task.progress}%`,
            },
            trigger: null,
          });
        }
      }
    });

    return () => subscription.remove();
  }, [tasks]);

  const saveAverageProcessesDurations = (
    newTask: Process,
    duration: number
  ): void => {
    const data = AsyncStorage.getItemSync(
      ASYNC_STORAGE_KEYS.averageProcessDuration
    );

    const parsedData: Record<string, number[]> | null = data
      ? JSON.parse(data)
      : null;

    const current = parsedData ?? {};

    const key: string = newTask.processName;

    const durations = current[key] ?? [];

    AsyncStorage.setItemSync(
      ASYNC_STORAGE_KEYS.averageProcessDuration,
      JSON.stringify({ ...parsedData, [key]: [...durations, duration] })
    );
  };

  const runBackgroundTask = async (
    newTask: Process,
    actionCallback: () => Promise<void>
  ): Promise<void> => {
    try {
      /** Create a new task */
      createBackgroundTask(newTask);

      /** Action callback */
      const start = performance.now();
      await actionCallback();
      const end = performance.now();

      const duration = end - start;

      saveAverageProcessesDurations(newTask, duration);

      /** update task as Done */
      updateBackgroundTask({
        ...newTask,
        state: "done",
      });

      const processName = newTask.processName.split("_")[1];
      const notificationMessage = setGenerationProcessName(
        processName,
        "Titulo del recurso:"
      ).replace("_", " ");

      eventBus.emit("notifications.createNotification.requested", {
        notificationId: uuid.v4(),
        title: "¡Recurso generado!",
        message: `✅ ${notificationMessage}`,
        creationDate: new Date(),
      });
    } catch (e: unknown) {
      console.error(e);
      updateBackgroundTask({ ...newTask, state: "error" });
      eventBus.emit("notifications.createNotification.requested", {
        notificationId: uuid.v4(),
        title: newTask.processName,
        message: "❌ No se pudo completar el proceso",
        creationDate: new Date(),
      });
    } finally {
      /** Delete backgraund task when it have finished */
      removeBackgroundTask(newTask.processId);
    }
  };

  return { runBackgroundTask };
};

export default useBackgroundTaskRunner;
