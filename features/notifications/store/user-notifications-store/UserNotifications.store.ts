import { compareAsc, compareDesc } from "date-fns";
import { scheduleNotificationAsync } from "expo-notifications";
import AsyncStorage from "expo-sqlite/kv-store";
import { create } from "zustand";

import { Notification, Order } from "../../types";
import { UserNotificationStoreType } from "./store-types";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

import { getParsedNotifications } from "./helpers";

export const UserNotificationsStore = create<UserNotificationStoreType>(
  (set) => ({
    notifications: [],
    notification: null,
    createNotification: async (
      notification: Notification,
      pushNotificationsAvailable: boolean
    ): Promise<void> => {
      try {
        const notifications = await getParsedNotifications();

        const existsNotifications: boolean = notifications.length > 0;

        await AsyncStorage.setItem(
          ASYNC_STORAGE_KEYS.userNotifications,
          JSON.stringify(
            existsNotifications
              ? [...notifications, notification]
              : [notification]
          )
        );
        set(({ notifications }) => ({
          notifications: [...notifications, notification],
        }));

        if (!pushNotificationsAvailable) return;
        await scheduleNotificationAsync({
          content: {
            title: notification.title,
            body: notification.message,
          },
          trigger: null,
        });
      } catch (error: unknown) {
        console.log(error);
      }
    },
    getAllNotifications: async (filter: Order): Promise<void> => {
      try {
        const notifications = await getParsedNotifications();
        const sortedNotifications = notifications.sort((a, b) =>
          filter === "asc"
            ? compareAsc(a.creationDate, b.creationDate)
            : compareDesc(a.creationDate, b.creationDate)
        );
        set({ notifications: sortedNotifications });
      } catch (error: unknown) {
        console.log(error);
      }
    },
    getOneNotification: async (notificationId: string): Promise<void> => {
      try {
        const notifications = await getParsedNotifications();
        const notification = notifications.find(
          (n) => n.notificationId === notificationId
        );
        if (notification) set({ notification: null });
        else set({ notification });
      } catch (error) {
        console.log(error);
      }
    },
    removeAllNotifications: async (): Promise<void> => {
      try {
        await AsyncStorage.setItem(
          ASYNC_STORAGE_KEYS.userNotifications,
          JSON.stringify([])
        );
        set({ notifications: [] });
      } catch (error) {
        console.log(error);
      }
    },
    removeOneNotification: async (notificationId: string): Promise<void> => {
      try {
        const notifications = await getParsedNotifications();
        const filteredNotifications = notifications.filter(
          (n) => n.notificationId !== notificationId
        );
        await AsyncStorage.setItem(
          ASYNC_STORAGE_KEYS.userNotifications,
          JSON.stringify(filteredNotifications)
        );
        set({ notifications: filteredNotifications });
      } catch (error) {
        console.log(error);
      }
    },
  })
);
