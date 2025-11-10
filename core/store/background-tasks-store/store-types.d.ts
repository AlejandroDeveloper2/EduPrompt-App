import { Process } from "../../types";

export interface StoreStateProps {
  tasks: Process[];
}

export interface StoreActions {
  getTaskByName: (taskName: string) => Process | null;
  createBackgroundTask: (task: Process) => void;
  updateBackgroundTask: (updatedTask: Process) => void;
  removeBackgroundTask: (taskId: string) => void;
}

export type BackgroundTaskStoreType = StoreStateProps & StoreActions;
