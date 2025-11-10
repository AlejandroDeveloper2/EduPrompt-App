import { useQueryClient } from "@tanstack/react-query";
import { scheduleNotificationAsync } from "expo-notifications";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import uuid from "react-native-uuid";

import { Process } from "@/core/types";

import { eventBus } from "@/core/events/EventBus";

import { useBackgroundTasksStore } from "../store";

import { calcAvarageProcessDuration } from "@/shared/utils";

const useBackgroundTaskRunner = () => {
  const queryClient = useQueryClient();
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
        const averageDuration = calcAvarageProcessDuration(
          queryClient,
          task.processName
        );
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
      queryClient.setQueryData<Record<string, number[]>>(
        ["processes_durations"],
        (data) => {
          const current = data ?? {};
          const key: string = newTask.processName;
          const durations = current[key] ?? [];
          return { ...data, [key]: [...durations, duration] };
        }
      );

      /** update task as Done */
      updateBackgroundTask({ ...newTask, state: "done" });

      eventBus.emit("notifications.createNotification.requested", {
        notificationId: uuid.v4(),
        title: newTask.processName,
        message: "✅ Proceso finalizado",
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
