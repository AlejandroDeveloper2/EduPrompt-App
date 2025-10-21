import AsyncStorage from "expo-sqlite/kv-store";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

import { Notification } from "../../types";

import { showToast } from "@/shared/context";

import { generateToastKey } from "@/shared/helpers";

export const getParsedNotifications = async () => {
  const notifications = JSON.parse(
    (await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.userNotifications)) ?? "[]"
  ) as Notification[];
  return notifications;
};

export const showErrorToast = (message: string, error: unknown): void => {
  console.log(error);
  showToast({
    message,
    key: generateToastKey(),
    variant: "danger",
  });
};
