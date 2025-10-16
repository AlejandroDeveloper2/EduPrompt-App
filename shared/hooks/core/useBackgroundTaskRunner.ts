import { scheduleNotificationAsync } from "expo-notifications";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";

import { Process } from "@/core/types";

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

      await scheduleNotificationAsync({
        content: {
          title: newTask.processName,
          body: "✅ Proceso finalizado",
        },
        trigger: null,
      });
    } catch (e: unknown) {
      console.error(e);
      updateBackgroundTask({ ...newTask, state: "error" });
      await scheduleNotificationAsync({
        content: {
          title: newTask.processName,
          body: "❌ No se pudo completar el proceso",
        },
        trigger: null,
      });
    } finally {
      /** Delete backgraund task when it have finished */
      removeBackgroundTask(newTask.processId);
    }
  };

  return { runBackgroundTask };
};

export default useBackgroundTaskRunner;
