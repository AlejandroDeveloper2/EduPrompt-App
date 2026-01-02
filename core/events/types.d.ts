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
}

interface SystemNotification extends Notification {
  links?: {
    label: string;
    href: string;
  }[];
}

/** Prompts */
interface Prompt {
  promptId: string;
  promptTitle: string;
  promptText: string;
  tag: string;
  sync: boolean;
}
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
  sync: boolean;
}

/** Educational Resources */
interface CreateResourcePayload {
  title: string;
  content: string;
  format: string;
  formatKey: "text" | "image" | "chart" | "table";
  groupTag: string;
}

export type {
  ChangePassPayload,
  CreateResourcePayload,
  EventError,
  EventHandler,
  EventKey,
  Notification,
  Prompt,
  SavePromptPayload,
  SendEmailChangePayload,
  SystemNotification,
  Tag,
  UpdateEmailPayload,
  UpdateTokensPayload,
  UserPreferences,
  UserProfile,
};
