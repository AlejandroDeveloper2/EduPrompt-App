interface SystemNotification {
  notificationId: string;
  title: string;
  message: string;
  links?: string[];
  creationDate: Date;
}

interface Notification {
  notificationId: string;
  title: string;
  notificationDate: string;
  message: string;
}

export type { Notification, SystemNotification };
