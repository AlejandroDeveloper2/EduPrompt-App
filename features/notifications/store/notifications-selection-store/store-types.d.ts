export interface StoreStateProps {
  selectionCount: number;
  selectedNotificationIds: Set<string>;
  isAllSelected: boolean;
}

export interface StoreActions {
  toggleSelection: (tagId: string, totalNotificationIdsCount: number) => void;
  selectAll: (tagIds: string[]) => void;
  clearSelection: () => void;
}

export type NotificationsSelectionStoreType = StoreStateProps & StoreActions;
