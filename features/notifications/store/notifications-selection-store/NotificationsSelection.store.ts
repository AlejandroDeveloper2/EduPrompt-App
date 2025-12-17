import { create } from "zustand";

import { NotificationsSelectionStoreType } from "./store-types";

export const NotificationsSelectionStore =
  create<NotificationsSelectionStoreType>((set, get) => ({
    selectionCount: 0,
    selectedNotificationIds: new Set<string>(),
    isAllSelected: false,

    toggleSelection: (tagId: string, totalTagIdsCount: number): void => {
      const { selectedNotificationIds } = get();
      const selectedElements = new Set(selectedNotificationIds);

      if (selectedElements.has(tagId)) selectedElements.delete(tagId);
      else selectedElements.add(tagId);

      set({
        selectedNotificationIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: selectedElements.size >= totalTagIdsCount,
      });
    },
    selectAll: (notificationIds: string[]): void => {
      const selectedElements = new Set<string>();

      notificationIds.forEach((notificationId) => {
        selectedElements.add(notificationId);
      });

      set({
        selectedNotificationIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: true,
      });
    },
    clearSelection: (): void => {
      const selectedElements = new Set<string>();
      set({
        selectedNotificationIds: selectedElements,
        selectionCount: selectedElements.size,
        isAllSelected: false,
      });
    },
  }));
