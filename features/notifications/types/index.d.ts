type LangTemplate = {
  en: string;
  es: string;
  pt: string;
};

type NotificationLink = {
  label: LangTemplate;
  href: string;
};

interface Notification {
  notificationId: string;
  title: string;
  creationDate: Date;
  message: string;
  read: boolean;
}

interface SystemNotification {
  notificationId: string;
  title: LangTemplate;
  message: LangTemplate;
  read: boolean;
  creationDate: Date;
  links?: NotificationLink[];
}

export type { Notification, NotificationLink, SystemNotification };
