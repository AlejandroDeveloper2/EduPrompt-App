import {
  ChangePassPayload,
  EventError,
  SendEmailChangePayload,
  UpdateEmailPayload,
  UserProfile,
} from "./types";

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
  "userProfile:updated": UserProfile | null;
};
