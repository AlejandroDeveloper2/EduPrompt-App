import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

import { showToast } from "@/shared/context";

import { generateToastKey } from "@/shared/helpers";
import {
  AppError,
  ErrorCodeType,
  ErrorMessages,
  removeSessionToken,
} from "@/shared/utils";

/** Manejador de errores global con react query */
const queryErrorHandler = (error: unknown) => {
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
          label: "Aquí",
        },
      });
      return;
    }

    if (errorMessageCode === "INVALID_SESSION") {
      showToast({
        variant: "danger",
        message,
        key: generateToastKey(),
        toastDuration: 6000,
      });

      removeSessionToken();

      router.replace("/auth");
      return;
    }
    showToast({
      variant: "danger",
      message: message ?? "Error desconocido",
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
