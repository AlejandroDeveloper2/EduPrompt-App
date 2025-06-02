import { StateCreator } from "zustand";

import { Process } from "@/lib/types/data-types";
import { BackgroundTaskStoreType, StoreActions } from "./store-types";

export const storeActions: StateCreator<
  BackgroundTaskStoreType,
  [],
  [],
  StoreActions
> = (set) => ({
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
      tasks: tasks.filter((task) => task.processId === taskId),
    }));
  },
});
