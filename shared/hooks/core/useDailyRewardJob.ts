import { addDays, isAfter } from "date-fns";
import AsyncStorage from "expo-sqlite/kv-store";
import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import uuid from "react-native-uuid";

import { config } from "@/core/config/enviromentVariables";
import { eventBus } from "@/core/events/EventBus";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

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

const getRewardDate = () => {
  const rewardDateRaw = AsyncStorage.getItemSync(ASYNC_STORAGE_KEYS.rewardDate);
  const now = new Date();

  const parsedRewardDataRaw: Date | null = rewardDateRaw
    ? JSON.parse(rewardDateRaw)
    : null;

  return {
    now,
    rewardDateRaw: parsedRewardDataRaw,
  };
};

const useDailyRewardJob = () => {
  const appState = useRef(AppState.currentState);

  const checkReward = (): void => {
    const { now, rewardDateRaw } = getRewardDate();

    if (!rewardDateRaw || isAfter(now, rewardDateRaw)) processTokenReward(now);
  };

  useEffect(() => {
    checkReward();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextState === "active"
      )
        checkReward();
      appState.current = nextState;
    });

    return () => subscription.remove();
  }, []);
};

export default useDailyRewardJob;
