import {
  ChangePassPayload,
  CreateResourcePayload,
  EventError,
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
} from "./types";

/** Eventos que se pueden usar en el EventBus */
export type AppEvents = {
  /** Eventos módulo de auth */
  "auth.authenticated": boolean;
  "auth.tokens.getted": { token: string | null; refreshToken: string | null };
  "auth.setTokens": { token: string; refreshToken: string };
  "auth.clearTokens": undefined;

  "auth.logout.requested": undefined;
  "auth.logout.started": undefined;
  "auth.logout.completed": undefined;
  "auth.logout.failed": EventError;

  "auth.refreshSession.requested": undefined;
  "auth.refreshSession.completed": {
    accessToken: string;
    refreshToken: string;
  };

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

  "userProfile.updateTokeUserCoins.requested": UpdateTokensPayload;
  "userProfile.updateTokeUserCoins.started": undefined;
  "userProfile.updateTokeUserCoins.completed": undefined;
  "userProfile.updateTokeUserCoins.failed": EventError;

  "userProfile.updateUserPreferences.requested": UserPreferences;

  "userProfile.updateAcoountType.requested": boolean;

  /** Eventos Módulo de notificaciones */
  "notifications.systemNotifications.updated": SystemNotification[];
  "notifications.userNotifications.updated": Notification[];
  "notifications.createNotification.requested": Omit<Notification, "read">;
  "notifications.createNotification.started": undefined;
  "notifications.createNotification.completed": undefined;
  "notifications.createNotification.failed": EventError;
  "notifications.checkNotification": undefined;

  /** Eventos Módulo de prompts */
  "prompts.list.pagination.updated": {
    prompts: Prompt[];
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    refreshing: boolean;
  };
  "prompts.fetchNextPage.requested": undefined;
  "prompts.refetch.requested": undefined;

  "prompts.fetch": {
    tag?: string | undefined;
    title?: string | undefined;
  };
  "prompts.savePrompt.requested": SavePromptPayload;
  "prompts.savePrompt.started": undefined;
  "prompts.savePrompt.completed": undefined;
  "prompts.savePrompt.failed": EventError;

  /** Eventos Módulo de dashboard */
  "dashboard.setLastGeneratedResource": string;
  "dashboard.addGeneratedResource": undefined;
  "dashboard.addUsedTokens": number;
  "dashboard.addDownloadedResources": undefined;
  "dashboard.addSavedResources": undefined;

  /** Eventos modo seleccion */
  "selectionMode.selectedElements.updated": number;
  "selectionMode.isAllSelected.updated": boolean;

  /** Eventos módulo de tags */
  "tags.list.pagination.updated": {
    tags: Tag[];
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    refreshing: boolean;
  };
  "tags.fetchNextPage.requested": undefined;
  "tags.refetch.requested": undefined;

  "tags.fetch": {
    type: "prompt_tag" | "resource_tag";
    name?: string | undefined;
  };
  "tags.createTag.requested": {
    type: "prompt_tag" | "resource_tag";
    name: string;
  };
  "tags.createTag.started": undefined;
  "tags.createTag.completed": undefined;
  "tags.createTag.failed": EventError;

  /** Eventos del módulo de recursos educativos */
  "resources.createResource.requested": CreateResourcePayload;
  "resources.createResource.started": undefined;
  "resources.createResource.completed": undefined;
  "resources.createResource.failed": EventError;
};
