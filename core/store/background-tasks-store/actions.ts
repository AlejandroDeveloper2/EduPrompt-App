import { StateCreator } from "zustand";

import { Process } from "../../types";
import { BackgroundTaskStoreType, StoreActions } from "./store-types";

/**
 * Define acciones para gestionar tareas en segundo plano en el store.
 *
 * @remarks
 * Este objeto proporciona métodos para crear, actualizar y eliminar tareas en segundo plano.
 *
 * @method createBackgroundTask
 * Añade una nueva tarea en segundo plano al store.
 * @param task - El objeto {@link Process} que representa la tarea en segundo plano a añadir.
 *
 * @method updateBackgroundTask
 * Actualiza una tarea en segundo plano existente en el store.
 * @param updatedTask - El objeto {@link Process} que contiene los datos actualizados de la tarea.
 *
 * @method removeBackgroundTask
 * Elimina una tarea en segundo plano del store por su ID de proceso.
 * @param taskId - El identificador único de la tarea a eliminar.
 */
export const storeActions: StateCreator<
  BackgroundTaskStoreType,
  [],
  [],
  StoreActions
> = (set, get) => ({
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
});
