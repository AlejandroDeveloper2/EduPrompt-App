import { compareAsc, compareDesc } from "date-fns";
import { scheduleNotificationAsync } from "expo-notifications";
import AsyncStorage from "expo-sqlite/kv-store";
import { create } from "zustand";

import { Notification, Order } from "../../types";
import { UserNotificationStoreType } from "./store-types";

import { eventBus } from "@/core/events/EventBus";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

import { getParsedNotifications, showErrorToast } from "./helpers";

export const UserNotificationsStore = create<UserNotificationStoreType>(
  (set) => ({
    notifications: [],
    notification: null,
    createNotification: async (
      notification: Omit<Notification, "read">,
      pushNotificationsAvailable: boolean
    ): Promise<void> => {
      try {
        const notifications = await getParsedNotifications();

        const updatedNotifications = [
          ...notifications,
          { ...notification, read: false },
        ];
        await AsyncStorage.setItem(
          ASYNC_STORAGE_KEYS.userNotifications,
          JSON.stringify(updatedNotifications)
        );

        set({
          notifications: updatedNotifications,
        });

        eventBus.emit(
          "notifications.userNotifications.updated",
          updatedNotifications
        );

        if (!pushNotificationsAvailable) return;
        await scheduleNotificationAsync({
          content: {
            title: notification.title,
            body: notification.message,
          },
          trigger: null,
        });
      } catch (error: unknown) {
        showErrorToast(
          "Ha ocurrido un error el sistema de notificaciones del usuario.",
          error
        );
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
        eventBus.emit(
          "notifications.userNotifications.updated",
          sortedNotifications
        );
      } catch (error: unknown) {
        showErrorToast(
          "Ha ocurrido un error el sistema de notificaciones del usuario.",
          error
        );
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
        showErrorToast(
          "Ha ocurrido un error el sistema de notificaciones del usuario.",
          error
        );
      }
    },
    removeAllNotifications: async (): Promise<void> => {
      try {
        await AsyncStorage.setItem(
          ASYNC_STORAGE_KEYS.userNotifications,
          JSON.stringify([])
        );
        set({ notifications: [] });
        eventBus.emit("notifications.userNotifications.updated", []);
      } catch (error) {
        showErrorToast(
          "Ha ocurrido un error el sistema de notificaciones del usuario.",
          error
        );
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
        eventBus.emit(
          "notifications.userNotifications.updated",
          filteredNotifications
        );
      } catch (error) {
        showErrorToast(
          "Ha ocurrido un error el sistema de notificaciones del usuario.",
          error
        );
      }
    },
    markAllNotificationsAsRead: async (): Promise<void> => {
      try {
        const notifications = await getParsedNotifications();
        const updatedNotifications = notifications.map((n) => ({
          ...n,
          read: true,
        }));

        await AsyncStorage.setItem(
          ASYNC_STORAGE_KEYS.userNotifications,
          JSON.stringify(updatedNotifications)
        );

        set({ notifications: updatedNotifications });

        eventBus.emit(
          "notifications.userNotifications.updated",
          updatedNotifications
        );
      } catch (error) {
        showErrorToast(
          "Ha ocurrido un error el sistema de notificaciones del usuario.",
          error
        );
      }
    },
  })
);
