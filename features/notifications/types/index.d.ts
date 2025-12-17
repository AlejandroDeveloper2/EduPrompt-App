type NotificationLink = {
  label: string;
  href: string;
};

type Order = "asc" | "desc";

interface Notification {
  notificationId: string;
  title: string;
  creationDate: Date;
  message: string;
  read: boolean;
}

interface SystemNotification extends Omit<Notification, "isSelected"> {
  links?: NotificationLink[];
}

export type { Notification, NotificationLink, Order, SystemNotification };
