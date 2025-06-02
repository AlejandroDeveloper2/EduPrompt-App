import { Process } from "@/lib/types/data-types";

export interface StoreStateProps {
  tasks: Process[];
}

export interface StoreActions {
  createBackgroundTask: (task: Process) => void;
  updateBackgroundTask: (updatedTask: Process) => void;
  removeBackgroundTask: (taskId: string) => void;
}

export type BackgroundTaskStoreType = StoreStateProps & StoreActions;
