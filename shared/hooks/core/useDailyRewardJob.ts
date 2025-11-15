import { addDays, isAfter } from "date-fns";
import {
  BackgroundTaskResult,
  BackgroundTaskStatus,
  getStatusAsync,
  registerTaskAsync,
} from "expo-background-task";
import AsyncStorage from "expo-sqlite/kv-store";
import * as TaskManager from "expo-task-manager";
import { useEffect } from "react";
import uuid from "react-native-uuid";

import { config } from "@/core/config/enviromentVariables";
import { eventBus } from "@/core/events/EventBus";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

const DAILY_REWARD_TASK_NAME = "daily_reward_task";

const sendTokensDailyReward = () => {
  eventBus.emit("userProfile.updateTokeUserCoins.requested", {
    amount: parseInt(config.tokenDailyRewardAmount),
    mode: "add",
  });
  eventBus.emit("notifications.createNotification.requested", {
    notificationId: uuid.v4(),
    title: "Recompensa diaria",
    creationDate: new Date(),
    message:
      "Has ganado 10 tokens gratis por ingresar diariamente a EduPrompt. Ingresa diariamente para no perderte esta recompensa.",
  });
};

const processTokenReward = (now: Date) => {
  sendTokensDailyReward();
  const nextRewardDate = addDays(now, 1);
  AsyncStorage.setItemSync(
    ASYNC_STORAGE_KEYS.rewardDate,
    JSON.stringify(nextRewardDate)
  );
};

TaskManager.defineTask(DAILY_REWARD_TASK_NAME, async () => {
  try {
    const rewardDateRaw = AsyncStorage.getItemSync(
      ASYNC_STORAGE_KEYS.rewardDate
    );
    const now = new Date();

    if (!rewardDateRaw || isAfter(now, new Date(rewardDateRaw))) {
      processTokenReward(now);
    }
    return BackgroundTaskResult.Success;
  } catch (error: unknown) {
    console.error("Background daily reward failed", error);
    return BackgroundTaskResult.Failed;
  }
});

const useDailyRewardJob = () => {
  useEffect(() => {
    const registerBackgroundRewardChecker = async () => {
      try {
        const status = await getStatusAsync();

        if (status === BackgroundTaskStatus.Restricted) {
          console.warn("[Task] Background fetch no permitido por el sistema");
          return;
        }

        const tasks = await TaskManager.getRegisteredTasksAsync();
        const isAlreadyRegistered = tasks.some(
          (task) => task.taskName === DAILY_REWARD_TASK_NAME
        );

        if (!isAlreadyRegistered) {
          await registerTaskAsync(DAILY_REWARD_TASK_NAME, {
            minimumInterval: 180, //Cada 3 horas 180 minutos
          });

          console.log("[Task] Background reward checker registrado");
        }
      } catch (error) {
        console.error("[Task] Error registrando background fetch:", error);
      }
    };
    (() => {
      const rewardDateRaw = AsyncStorage.getItemSync(
        ASYNC_STORAGE_KEYS.rewardDate
      );
      const now = new Date();

      if (!rewardDateRaw) {
        processTokenReward(now);
      }
    })();
    registerBackgroundRewardChecker();
  }, []);
};

export default useDailyRewardJob;
