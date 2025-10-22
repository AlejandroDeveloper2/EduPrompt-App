import { BackgroundTaskResult } from "expo-background-task";
import * as TaskManager from "expo-task-manager";
import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";

import { registerBackgroundNotificationChecker } from "../../utils";

const CHECK_TASK_NAME = "check_notifications_task";

TaskManager.defineTask(CHECK_TASK_NAME, async () => {
  try {
    eventBus.emit("notifications.checkNotification", undefined);
    return BackgroundTaskResult.Success;
  } catch (error: unknown) {
    console.error("Background checker failed", error);
    return BackgroundTaskResult.Failed;
  }
});

const useNotificationCheckerJob = (): void => {
  useEffect(() => {
    const interval = setInterval(() => {
      eventBus.emit("notifications.checkNotification", undefined);
    }, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    registerBackgroundNotificationChecker();
  }, []);
};

export default useNotificationCheckerJob;
