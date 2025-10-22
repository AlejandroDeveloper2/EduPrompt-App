import {
  BackgroundTaskStatus,
  getStatusAsync,
  registerTaskAsync,
} from "expo-background-task";
import * as TaskManager from "expo-task-manager";

const CHECK_TASK_NAME = "check_notifications_task";

export const registerBackgroundNotificationChecker = async () => {
  try {
    const status = await getStatusAsync();

    if (status === BackgroundTaskStatus.Restricted) {
      console.warn("[Task] Background fetch no permitido por el sistema");
      return;
    }

    const tasks = await TaskManager.getRegisteredTasksAsync();
    const isAlreadyRegistered = tasks.some(
      (task) => task.taskName === CHECK_TASK_NAME
    );

    if (!isAlreadyRegistered) {
      await registerTaskAsync(CHECK_TASK_NAME, {
        minimumInterval: 60 * 5,
      });

      console.log("[Task] Background notification checker registrado");
    }
  } catch (error) {
    console.error("[Task] Error registrando background fetch:", error);
  }
};
