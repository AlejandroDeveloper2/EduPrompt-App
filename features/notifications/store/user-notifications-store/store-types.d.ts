import { Notification, Order } from "../../types";

export interface UserNotificationStoreType {
  notifications: Notification[];
  notification: Notification | null;
  createNotification: (
    notification: Notification,
    pushNotificationsAvailable: boolean
  ) => Promise<void>;
  getAllNotifications: (filters: Order) => Promise<void>;
  getOneNotification: (notificationId: string) => Promise<void>;
  removeAllNotifications: () => Promise<void>;
  removeOneNotification: (notificationId: string) => Promise<void>;
}
