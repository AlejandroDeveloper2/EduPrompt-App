import { compareAsc, compareDesc } from "date-fns";
import { scheduleNotificationAsync } from "expo-notifications";
import AsyncStorage from "expo-sqlite/kv-store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Notification, Order } from "../../types";
import { StoreStateProps, UserNotificationStoreType } from "./store-types";

import { eventBus } from "@/core/events/EventBus";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

import { NotificationsSelectionStore } from "../notifications-selection-store/NotificationsSelection.store";

import { showErrorToast } from "./helpers";

export const UserNotificationsStore = create<UserNotificationStoreType>()(
  persist<UserNotificationStoreType, [], [], StoreStateProps>(
    (set, get) => ({
      notifications: [],
      notification: null,
      /** Managment actions */
      createNotification: async (
        notification: Omit<Notification, "read">,
        pushNotificationsAvailable: boolean
      ): Promise<void> => {
        try {
          const { notifications } = get();
          const updatedNotifications = [
            ...notifications,
            { ...notification, read: false },
          ];

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
            "Ha ocurrido un error en el sistema de notificaciones del usuario.",
            error
          );
        }
      },
      getAllNotifications: (filter: Order): void => {
        const { notifications } = get();
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
      },
      getOneNotification: (notificationId: string): void => {
        const { notifications } = get();

        const notification = notifications.find(
          (n) => n.notificationId === notificationId
        );

        if (!notification) set({ notification: null });
        else set({ notification });
      },
      removeAllNotifications: (): void => {
        set({ notifications: [] });
        eventBus.emit("notifications.userNotifications.updated", []);
      },
      markAllNotificationsAsRead: (): void => {
        const { notifications } = get();
        const updatedNotifications = notifications.map((n) => ({
          ...n,
          read: true,
        }));

        set({ notifications: updatedNotifications });

        eventBus.emit(
          "notifications.userNotifications.updated",
          updatedNotifications
        );
      },

      deleteSelectedNotifications: (): void => {
        const { notifications } = get();
        const { selectedNotificationIds } =
          NotificationsSelectionStore.getState();
        const selectedNotifications = Array.from(selectedNotificationIds);

        let updated: Notification[] = [];
        selectedNotifications.forEach((notificationId) => {
          updated = notifications.filter(
            (n) => n.notificationId !== notificationId
          );
        });

        set({ notifications: updated });
        eventBus.emit("notifications.userNotifications.updated", updated);
      },
    }),
    {
      name: ASYNC_STORAGE_KEYS.userNotifications,
      storage: {
        getItem: async (name) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
      partialize: (state) => ({
        notifications: state.notifications,
        notification: state.notification,
      }),
    }
  )
);
