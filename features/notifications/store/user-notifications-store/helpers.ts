import AsyncStorage from "expo-sqlite/kv-store";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

import { Notification } from "../../types";

export const getParsedNotifications = async () => {
  const notifications = JSON.parse(
    (await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.userNotifications)) ?? "[]"
  ) as Notification[];
  return notifications;
};
