import { create } from "zustand";

import { NotificationsSelectionStoreType } from "./store-types";

export const useNotificationsSelectionStore =
  create<NotificationsSelectionStoreType>((set, get) => ({
    selectionMode: false,
    selectionCount: 0,
    selectedNotificationIds: new Set<string>(),
    isAllSelected: false,
    toggleSelectionMode: (selectionMode: boolean): void => {
      if (!selectionMode)
        return set({
          selectionMode: false,
          selectedNotificationIds: new Set<string>(),
          selectionCount: 0,
          isAllSelected: false,
        });
      set({ selectionMode });
    },
    toggleSelection: (
      notificationId: string,
      totalNotificationIdsCount: number,
    ): void => {
      const { selectedNotificationIds } = get();
      const selectedElements = new Set(selectedNotificationIds);

      if (selectedElements.has(notificationId))
        selectedElements.delete(notificationId);
      else selectedElements.add(notificationId);

      set({
        selectedNotificationIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: selectedElements.size >= totalNotificationIdsCount,
        selectionMode: selectedElements.size > 0,
      });
    },
    toggleSelectAll: (notificationIds: string[]): void => {
      const selectedElements = new Set<string>();

      if (notificationIds.length === 0)
        return set({
          selectedNotificationIds: selectedElements,
          selectionCount: selectedElements.size,
          isAllSelected: false,
          selectionMode: false,
        });

      notificationIds.forEach((notificationId) => {
        selectedElements.add(notificationId);
      });

      set({
        selectedNotificationIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: true,
      });
    },
  }));
