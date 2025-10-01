import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

import { showToast } from "../context";
import { ErrorMessages } from "./ErrorMessages";
import { ErrorCodeType, ServerError } from "./ServerError";

import { generateToastKey } from "../helpers";

/** Manejador de errores global */
const queryErrorHandler = (error: unknown) => {
  if (error instanceof Error) {
    const errorMessageCode = (error as ServerError).message as ErrorCodeType;
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

    showToast({
      variant: "danger",
      message: message ?? errorMessageCode,
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
