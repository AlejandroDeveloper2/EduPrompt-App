/* eslint-disable react-hooks/exhaustive-deps */
import { BackgroundTaskResult, registerTaskAsync } from "expo-background-task";
import * as TaskManager from "expo-task-manager";
import { useEffect } from "react";
import { AppState } from "react-native";

import { eventBus } from "@/core/events/EventBus";

import { useEventbusValue } from "@/shared/hooks/events";
import { useUserNotificationsStore } from "../store";

import { UserNotificationsStore } from "../../store";
import { shouldPerformClean } from "../../utils";

const CLEAN_TASK_NAME = "clean_notifications_task";

TaskManager.defineTask(CLEAN_TASK_NAME, async () => {
  try {
    const userProfile = eventBus.getLast("userProfile.user.updated");

    const should = shouldPerformClean(userProfile);
    if (!should) return BackgroundTaskResult.Failed;

    await UserNotificationsStore.getState().removeAllNotifications();
    eventBus.emit("userProfile.updateUserPreferences.requested", {
      ...userProfile?.userPreferences,
      lastCleanAt: new Date().toISOString(),
    });

    return BackgroundTaskResult.Success;
  } catch (error: unknown) {
    console.error("Background clean failed", error);
    return BackgroundTaskResult.Failed;
  }
});

const useCleanNotificationsJob = () => {
  const userProfile = useEventbusValue("userProfile.user.updated", null);
  const { removeAllNotifications } = useUserNotificationsStore();

  const performClean = async (): Promise<void> => {
    await removeAllNotifications();
    eventBus.emit("userProfile.updateUserPreferences.requested", {
      ...userProfile?.userPreferences,
      lastCleanAt: new Date().toISOString(),
    });
  };

  useEffect(() => {
    (async () => {
      if (userProfile?.userPreferences?.autoCleanNotifications) {
        const frecuency = userProfile.userPreferences.cleanFrecuency
          ? parseInt(
              userProfile.userPreferences.cleanFrecuency.split("-")[0] ?? 2
            )
          : 2;

        await registerTaskAsync(CLEAN_TASK_NAME, {
          minimumInterval: 60 * 24 * frecuency,
        });
      }

      const should = shouldPerformClean(userProfile);
      if (should) {
        await performClean();
      }
    })();

    let cleaning = false;
    const sub = AppState.addEventListener("change", async (state) => {
      if (state === "active" && !cleaning) {
        cleaning = true;
        const should = shouldPerformClean(userProfile);
        if (should) await performClean();
        cleaning = false;
      }
    });

    return () => sub.remove();
  }, [userProfile]);
};

export default useCleanNotificationsJob;
