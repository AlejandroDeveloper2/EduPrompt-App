import { AppEvents } from "./events";

type EventKey = keyof AppEvents;
type EventHandler<K extends EventKey> = (payload: AppEvents[K]) => void;

/** Tipos para eventos de la app */
interface EventError {
  error: string;
}

/** Auth */
interface ChangePassPayload {
  currentPassword: string;
  newPassword: string;
}
interface SendEmailChangePayload {
  updatedEmail: string;
  toggleFormState: () => void;
}
interface UpdateEmailPayload extends SendEmailChangePayload {
  code: string;
}

/** Users */
interface UserProfile {
  tokenCoins: number;
  isPremiumUser: boolean;
  userPreferences: {
    autoSync: boolean;
    cleanFrecuency: string | null;
    pushNotifications: boolean;
    autoCleanNotifications: boolean;
    language: string;
  };
}

/** Notifications */
interface SystemNotification {
  notificationId: string;
  title: string;
  creationDate: Date;
  message: string;
  links?: {
    label: string;
    href: string;
  }[];
}

export type {
  ChangePassPayload,
  EventError,
  EventHandler,
  EventKey,
  SendEmailChangePayload,
  SystemNotification,
  UpdateEmailPayload,
  UserProfile,
};
