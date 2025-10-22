import {
  ChangePassPayload,
  EventError,
  Notification,
  SendEmailChangePayload,
  SystemNotification,
  UpdateEmailPayload,
  UserPreferences,
  UserProfile,
} from "./types";

/** Eventos que se pueden usar en el EventBus */
export type AppEvents = {
  /** Eventos módulo de auth */
  "auth.logout.requested": undefined;
  "auth.logout.started": undefined;
  "auth.logout.completed": undefined;
  "auth.logout.failed": EventError;

  "auth.changePassword.requested": ChangePassPayload;
  "auth.changePassword.started": undefined;
  "auth.changePassword.completed": undefined;
  "auth.changePassword.failed": EventError;

  "auth.sendEmailUpdateRequest.requested": SendEmailChangePayload;
  "auth.sendEmailUpdateRequest.started": undefined;
  "auth.sendEmailUpdateRequest.completed": undefined;
  "auth.sendEmailUpdateRequest.failed": EventError;

  "auth.updateEmail.requested": UpdateEmailPayload;
  "auth.updateEmail.started": undefined;
  "auth.updateEmail.completed": undefined;
  "auth.updateEmail.failed": EventError;

  /** Eventos Módulo de perfil usuarios  */
  "userProfile.user.updated": UserProfile | null;

  "userProfile.updateUserPreferences.requested": Partial<UserPreferences>;
  "userProfile.updateUserPreferences.started": undefined;
  "userProfile.updateUserPreferences.completed": undefined;
  "userProfile.updateUserPreferences.failed": EventError;

  /** Eventos Módulo de notificaciones */
  "notifications.systemNotifications.updated": SystemNotification[];
  "notifications.userNotifications.updated": Notification[];
  "notifications.createNotification.requested": Omit<Notification, "read">;
  "notifications.createNotification.started": undefined;
  "notifications.createNotification.completed": undefined;
  "notifications.createNotification.failed": EventError;
  "notifications.checkNotification": undefined;
};
