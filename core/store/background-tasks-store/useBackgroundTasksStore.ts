import { create } from "zustand";

import { Process } from "@/core/types";
import { BackgroundTaskStoreType } from "./store-types";

export const useBackgroundTasksStore = create<BackgroundTaskStoreType>(
  (set, get) => ({
    tasks: [],
    getTaskByName: (taskName: string): Process | null => {
      const task = get().tasks.find((t) => t.processName === taskName);
      if (!task) return null;
      return task;
    },
    createBackgroundTask: (task: Process): void => {
      set(({ tasks }) => ({ tasks: [...tasks, task] }));
    },

    updateBackgroundTask: (updatedTask: Process): void => {
      set(({ tasks }) => ({
        tasks: tasks.map((task) => {
          if (task.processId === updatedTask.processId) return updatedTask;
          return task;
        }),
      }));
    },

    removeBackgroundTask: (taskId: string): void => {
      set(({ tasks }) => ({
        tasks: tasks.filter((task) => task.processId !== taskId),
      }));
    },
  }),
);
