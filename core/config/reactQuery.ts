import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

import { showToast } from "@/shared/context";
import { i18n } from "../store";

import { generateToastKey } from "@/shared/helpers";
import { AppError, ErrorCodeType, ErrorMessages } from "@/shared/utils";

/** Manejador de errores global con react query */
const queryErrorHandler = async (error: unknown) => {
  if (error instanceof Error) {
    const errorMessageCode = (error as AppError).name as ErrorCodeType;
    /** Disparar el toast de error */
    const message = ErrorMessages[errorMessageCode];

    if (errorMessageCode === "INACTIVE_ACCOUNT") {
      showToast({
        variant: "danger",
        message,
        key: generateToastKey(),
        toastDuration: 6000,
        link: {
          href: "/auth/account_activation_request_screen",
          label: i18n.t("common_translations.account_activation_link_label"),
        },
      });
      return;
    }

    if (errorMessageCode === "SUBSCRIPTION_NOT_FOUND") return;

    showToast({
      variant: "danger",
      message: message ?? i18n.t("server_error_messages.unknown_error_msg"),
      key: generateToastKey(),
      toastDuration: 4000,
    });
  }
};

/** Cliente react query */
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: queryErrorHandler,
  }),
  mutationCache: new MutationCache({
    onError: queryErrorHandler,
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
