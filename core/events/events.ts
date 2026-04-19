import { Product, Subscription } from "@/features/marketplace/types";
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

  "userProfile.syncData.requested": undefined;
  "userProfile.syncData.started": undefined;
  "userProfile.syncData.completed": undefined;
  "userProfile.syncData.failed": EventError;

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

  "prompts.syncData.requested": undefined;
  "prompts.syncData.started": undefined;
  "prompts.syncData.completed": undefined;
  "prompts.syncData.failed": EventError;

  /** Eventos Módulo de dashboard */
  "dashboard.setLastGeneratedResource": string;
  "dashboard.addGeneratedResource": undefined;
  "dashboard.addUsedTokens": number;
  "dashboard.addDownloadedResources": number;
  "dashboard.addSavedResources": undefined;

  "dashboard.syncData.requested": undefined;
  "dashboard.syncData.started": undefined;
  "dashboard.syncData.completed": undefined;
  "dashboard.syncData.failed": EventError;

  /** Eventos modo seleccion */
  "selectionMode.selectedElements.updated": number;
  "selectionMode.isAllSelected.updated": boolean;

  /** Eventos módulo de tags */
  "tags.list.promptType.updated": {
    tags: Tag[];
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    refreshing: boolean;
  };
  "tags.promptType.fetchNextPage.requested": undefined;
  "tags.promptType.refetch.requested": undefined;
  "tags.promptType.fetch": string | undefined;

  "tags.list.resourceType.updated": {
    tags: Tag[];
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    refreshing: boolean;
  };
  "tags.resourceType.fetch": string | undefined;
  "tags.resourceType.refetch.requested": undefined;
  "tags.resourceType.fetchNextPage.requested": undefined;

  "tags.createTag.requested": {
    type: "prompt_tag" | "resource_tag";
    name: string;
  };
  "tags.createTag.started": undefined;
  "tags.createTag.completed": undefined;
  "tags.createTag.failed": EventError;

  "tags.syncData.requested": undefined;
  "tags.syncData.started": undefined;
  "tags.syncData.completed": undefined;
  "tags.syncData.failed": EventError;

  /** Eventos del módulo de recursos educativos */
  "resources.createResource.requested": CreateResourcePayload;
  "resources.createResource.started": undefined;
  "resources.createResource.completed": undefined;
  "resources.createResource.failed": EventError;

  "resources.syncData.requested": undefined;
  "resources.syncData.started": undefined;
  "resources.syncData.completed": undefined;
  "resources.syncData.failed": EventError;

  /** Eventos del módulo de tienda y suscripciones */
  "marketplace.cancelSubscription.requested": {
    subscriptionId: string;
    currentHistoryId: string;
  };
  "marketplace.cancelSubscription.started": undefined;
  "marketplace.cancelSubscription.completed": undefined;
  "marketplace.cancelSubscription.failed": EventError;

  "marketplace.createOrder.requested": {
    product: Product;
    retryPayment: boolean;
  };
  "marketplace.createOrder.loading": boolean;
  "marketplace.orderStatus.loading": boolean;

  "marketplace.subscription.updated": Subscription | null;
};
