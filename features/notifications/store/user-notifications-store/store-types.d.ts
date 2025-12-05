import { Notification, Order } from "../../types";

export interface StoreStateProps {
  notifications: Notification[];
  notification: Notification | null;
}

export interface StoreActions {
  /** Managment actions */
  createNotification: (
    notification: Omit<Notification, "read">,
    pushNotificationsAvailable: boolean
  ) => Promise<void>;
  getAllNotifications: (filters: Order) => void;
  getOneNotification: (notificationId: string) => void;
  removeAllNotifications: () => void;
  markAllNotificationsAsRead: () => void;

  /** Selection mode actions */
  selectAllNotifications: () => void;
  selectNotification: (notificationId: string) => void;
  unselectNotification: (notificationId: string) => void;
  deleteSelectedNotifications: (disableSelectionMode: () => void) => void;
  clearSelectionList: () => void;
}

export type UserNotificationStoreType = StoreStateProps & StoreActions;
