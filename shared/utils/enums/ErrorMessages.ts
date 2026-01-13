import { i18n } from "@/core/store";

/** Constante con los diferentes códigos personalizados de error mapeados con su mensaje al usuario*/
export const ErrorMessages = {
  INTERNAL_SERVER_ERROR: i18n.t(
    "server-error-messages.internal-server-error-msg"
  ),
  DATABASE_CONNECTION_ERROR: i18n.t(
    "server-error-messages.database-connection-error-msg"
  ),
  VALIDATION_ERROR: i18n.t("server-error-messages.validation-error-msg"),
  EMAIL_SENDING_ERROR: i18n.t("server-error-messages.email-sending-error-msg"),
  USER_EMAIL_ALREADY_EXISTS: i18n.t(
    "server-error-messages.user-email-already-exists-msg"
  ),
  USERNAME_ALREADY_EXISTS: i18n.t(
    "server-error-messages.username-already-exists-msg"
  ),
  USER_NOT_FOUND: i18n.t("server-error-messages.user-not-found-msg"),
  INACTIVE_ACCOUNT: i18n.t("server-error-messages.inactive-account-msg"),
  INCORRECT_PASSWORD: i18n.t("server-error-messages.incorrect-password-msg"),
  INVALID_SESSION: i18n.t("server-error-messages.invalid-session-msg"),
  SESSION_ALREADY_ACTIVE: i18n.t(
    "server-error-messages.session-already-active-msg"
  ),
  INVALID_CODE: i18n.t("server-error-messages.invalid-code-msg"),
  EXPIRED_CODE: i18n.t("server-error-messages.expired-code-msg"),
  REQUIRED_TOKEN: i18n.t("server-error-messages.required-token-msg"),
  EXPIRED_TOKEN: i18n.t("server-error-messages.expired-token-msg"),
  INVALID_TOKEN: i18n.t("server-error-messages.invalid-token-msg"),
  REQUIRED_REFRESH: i18n.t("server-error-messages.required-refresh-msg"),
  MISSING_API_KEY: i18n.t("server-error-messages.missing-api-key-msg"),
  INACTIVE_API_KEY: i18n.t("server-error-messages.inactive-api-key-msg"),
  EXPIRED_API_KEY: i18n.t("server-error-messages.expired-api-key-msg"),
  INVALID_API_KEY: i18n.t("server-error-messages.invalid-api-key-msg"),
  INSUFFICIENT_SCOPES: i18n.t("server-error-messages.insufficient-scopes-msg"),
  API_KEY_VALIDATION_ERROR: i18n.t(
    "server-error-messages.api-key-validation-error-msg"
  ),
  MISSING_ADMIN_AUTH_HEADERS: i18n.t(
    "server-error-messages.missing-admin-auth-headers-msg"
  ),
  UNAUTHORIZED: i18n.t("server-error-messages.unauthorized-msg"),
  RESOURCE_NOT_FOUND: i18n.t("server-error-messages.resource-not-found-msg"),
  SOME_RESOURCE_NOT_FOUND: i18n.t(
    "server-error-messages.some-resource-not-found-msg"
  ),
  PROMPT_NOT_FOUND: i18n.t("server-error-messages.prompt-not-found-msg"),
  SOME_PROMPT_NOT_FOUND: i18n.t(
    "server-error-messages.some-prompt-not-found-msg"
  ),
  NOTIFICATION_NOT_FOUND: i18n.t(
    "server-error-messages.notification-not-found-msg"
  ),
  SOME_NOTIFICATION_NOT_FOUND: i18n.t(
    "server-error-messages.some-notification-not-found-msg"
  ),
  IMAGE_GENERATION_NOT_COMPLETED: i18n.t(
    "server-error-messages.image-generation-not-completed-msg"
  ),
  INDICATOR_NOT_FOUND: i18n.t("server-error-messages.indicator-not-found-msg"),
  USER_INDICATOR_ALREADY_CREATED: i18n.t(
    "server-error-messages.user-indicator-already-created-msg"
  ),
  TAG_NOT_FOUND: i18n.t("server-error-messages.tag-not-found-msg"),
  SOME_TAG_NOT_FOUND: i18n.t("server-error-messages.some-tag-not-found-msg"),
};
