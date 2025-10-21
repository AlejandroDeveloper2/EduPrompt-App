import { scheduleNotificationAsync } from "expo-notifications";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import uuid from "react-native-uuid";

import { Process } from "@/core/types";

import { eventBus } from "@/core/events/EventBus";
import { useBackgroundTasksStore } from "../store";

const useBackgroundTaskRunner = () => {
  const appState = useRef<AppStateStatus>(AppState.currentState);

  const {
    tasks,
    createBackgroundTask,
    updateBackgroundTask,
    removeBackgroundTask,
  } = useBackgroundTasksStore();

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
      await actionCallback();

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
