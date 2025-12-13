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
interface UserPreferences {
  autoSync: boolean;
  lastCleanAt?: string;
  cleanFrecuency: string | null;
  pushNotifications: boolean;
  autoCleanNotifications: boolean;
  language: string;
}
interface UserProfile {
  tokenCoins: number;
  isPremiumUser: boolean;
  userPreferences: UserPreferences;
}
interface UpdateTokensPayload {
  amount: number;
  mode: "add" | "substract";
}

/** Notifications */
interface Notification {
  notificationId: string;
  title: string;
  creationDate: Date;
  message: string;
  read: boolean;
  isSelected: boolean;
}

interface SystemNotification extends Notification {
  links?: {
    label: string;
    href: string;
  }[];
}

/** Prompts */
interface SavePromptPayload {
  promptTitle: string;
  promptText: string;
  tag: string;
}

/** Tags */
interface Tag {
  tagId: string;
  name: string;
  type: "prompt_tag" | "resource_tag";
}

export type {
  ChangePassPayload,
  EventError,
  EventHandler,
  EventKey,
  Notification,
  SavePromptPayload,
  SendEmailChangePayload,
  SystemNotification,
  Tag,
  UpdateEmailPayload,
  UpdateTokensPayload,
  UserPreferences,
  UserProfile,
};
