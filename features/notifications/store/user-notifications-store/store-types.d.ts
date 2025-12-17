import { Notification, Order } from "../../types";

export interface StoreStateProps {
  notifications: Notification[];
  notification: Notification | null;
}

export interface StoreActions {
  createNotification: (
    notification: Omit<Notification, "read">,
    pushNotificationsAvailable: boolean
  ) => Promise<void>;
  getAllNotifications: (filters: Order) => void;
  getOneNotification: (notificationId: string) => void;
  removeAllNotifications: () => void;
  markAllNotificationsAsRead: () => void;
  deleteSelectedNotifications: () => void;
}

export type UserNotificationStoreType = StoreStateProps & StoreActions;
