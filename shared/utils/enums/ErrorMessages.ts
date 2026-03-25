import { i18n } from "@/core/store";

/** Constante con los diferentes códigos personalizados de error mapeados con su mensaje al usuario*/
export const ErrorMessages = {
  INTERNAL_SERVER_ERROR: i18n.t(
    "server_error_messages.internal_server_error_msg",
  ),
  DATABASE_CONNECTION_ERROR: i18n.t(
    "server_error_messages.database_connection_error_msg",
  ),
  VALIDATION_ERROR: i18n.t("server_error_messages.validation_error_msg"),
  EMAIL_SENDING_ERROR: i18n.t("server_error_messages.email_sending_error_msg"),
  USER_EMAIL_ALREADY_EXISTS: i18n.t(
    "server_error_messages.user_email_already_exists_msg",
  ),
  USERNAME_ALREADY_EXISTS: i18n.t(
    "server_error_messages.username_already_exists_msg",
  ),
  USER_NOT_FOUND: i18n.t("server_error_messages.user_not_found_msg"),
  INACTIVE_ACCOUNT: i18n.t("server_error_messages.inactive_account_msg"),
  INCORRECT_PASSWORD: i18n.t("server_error_messages.incorrect_password_msg"),
  INVALID_SESSION: i18n.t("server_error_messages.invalid_session_msg"),
  SESSION_ALREADY_ACTIVE: i18n.t(
    "server_error_messages.session_already_active_msg",
  ),
  INVALID_CODE: i18n.t("server_error_messages.invalid_code_msg"),
  EXPIRED_CODE: i18n.t("server_error_messages.expired_code_msg"),
  REQUIRED_TOKEN: i18n.t("server_error_messages.required_token_msg"),
  EXPIRED_TOKEN: i18n.t("server_error_messages.expired_token_msg"),
  INVALID_TOKEN: i18n.t("server_error_messages.invalid_token_msg"),
  REQUIRED_REFRESH: i18n.t("server_error_messages.required_refresh_msg"),
  MISSING_API_KEY: i18n.t("server_error_messages.missing_api_key_msg"),
  INACTIVE_API_KEY: i18n.t("server_error_messages.inactive_api_key_msg"),
  EXPIRED_API_KEY: i18n.t("server_error_messages.expired_api_key_msg"),
  INVALID_API_KEY: i18n.t("server_error_messages.invalid_api_key_msg"),
  INSUFFICIENT_SCOPES: i18n.t("server_error_messages.insufficient_scopes_msg"),
  API_KEY_VALIDATION_ERROR: i18n.t(
    "server_error_messages.api_key_validation_error_msg",
  ),
  MISSING_ADMIN_AUTH_HEADERS: i18n.t(
    "server_error_messages.missing_admin_auth_headers_msg",
  ),
  UNAUTHORIZED: i18n.t("server_error_messages.unauthorized_msg"),
  RESOURCE_NOT_FOUND: i18n.t("server_error_messages.resource_not_found_msg"),
  SOME_RESOURCE_NOT_FOUND: i18n.t(
    "server_error_messages.some_resource_not_found_msg",
  ),
  PROMPT_NOT_FOUND: i18n.t("server_error_messages.prompt_not_found_msg"),
  SOME_PROMPT_NOT_FOUND: i18n.t(
    "server_error_messages.some_prompt_not_found_msg",
  ),
  NOTIFICATION_NOT_FOUND: i18n.t(
    "server_error_messages.notification_not_found_msg",
  ),
  SOME_NOTIFICATION_NOT_FOUND: i18n.t(
    "server_error_messages.some_notification_not_found_msg",
  ),
  IMAGE_GENERATION_NOT_COMPLETED: i18n.t(
    "server_error_messages.image_generation_not_completed_msg",
  ),
  INDICATOR_NOT_FOUND: i18n.t("server_error_messages.indicator_not_found_msg"),
  USER_INDICATOR_ALREADY_CREATED: i18n.t(
    "server_error_messages.user_indicator_already_created_msg",
  ),
  TAG_NOT_FOUND: i18n.t("server_error_messages.tag_not_found_msg"),
  SOME_TAG_NOT_FOUND: i18n.t("server_error_messages.some_tag_not_found_msg"),

  CREATE_ORDER_ERROR: i18n.t("server_error_messages.create_order_error_msg"),
  CAPTURE_ORDER_ERROR: i18n.t("server_error_messages.capture_order_error_msg"),
  GET_ORDER_ERROR: i18n.t("server_error_messages.get_order_error_msg"),
  ORDER_NOT_FOUND: i18n.t("server_error_messages.order_not_found_msg"),
  SUBSCRIPTION_NOT_FOUND: i18n.t(
    "server_error_messages.subscription_not_found_msg",
  ),
  SUBSCRIPTION_HISTORY_ITEM_NOT_FOUND: i18n.t(
    "server_error_messages.subscription_history_item_not_found_msg",
  ),
  SUBSCRIPTION_CREATION_ERROR: i18n.t(
    "server_error_messages.subscription_creation_error_msg",
  ),
  AUTH_REQUIRED: i18n.t("server_error_messages.auth_required_msg"),
};
