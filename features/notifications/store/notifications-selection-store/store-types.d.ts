export interface StoreStateProps {
  selectionMode: boolean;
  selectionCount: number;
  selectedNotificationIds: Set<string>;
  isAllSelected: boolean;
}

export interface StoreActions {
  toggleSelectionMode: (selectionMode: boolean) => void;
  toggleSelection: (
    notificationId: string,
    totalNotificationIdsCount: number,
  ) => void;
  toggleSelectAll: (notificationIds: string[]) => void;
}

export type NotificationsSelectionStoreType = StoreStateProps & StoreActions;
