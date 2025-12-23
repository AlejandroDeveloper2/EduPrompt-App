import { useRouter } from "expo-router";
import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";

import { ChangePassPayload } from "../../types";

import {
  useChangePasswordMutation,
  useLogoutMutation,
  useRefreshSessionMutation,
  useSendUpdateEmailRequestMutation,
  useUpdateEmailMutation,
} from "../mutations";
import { useAuthStore } from "../store";

const useAuthEventListeners = () => {
  const router = useRouter();

  const {
    setAuthTokens,
    clearAuthTokens,
    token,
    refreshToken,
    isAuthenticated,
  } = useAuthStore();

  const logoutMutation = useLogoutMutation();
  const passChangeMutation = useChangePasswordMutation();
  const sendEmailUpdateMutation = useSendUpdateEmailRequestMutation();
  const updatedEmailMutation = useUpdateEmailMutation();
  const refreshSessionMutation = useRefreshSessionMutation();

  // useEffect(() => {
  //   console.log("Tokens desde listener de auth :", { token, refreshToken });
  // }, [token, refreshToken]);

  useEffect(() => {
    eventBus.emit("auth.tokens.getted", { token, refreshToken });
  }, [token, refreshToken]);

  useEffect(() => {
    eventBus.emit("auth.authenticated", isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    const handler = ({
      token,
      refreshToken,
    }: {
      token: string;
      refreshToken: string;
    }) => {
      setAuthTokens(token, refreshToken);
    };

    eventBus.on("auth.setTokens", handler);
    return () => {
      eventBus.off("auth.setTokens", handler);
    };
  }, [setAuthTokens]);

  useEffect(() => {
    const handler = async () => {
      await clearAuthTokens();
      eventBus.clearAll();
      router.replace("/auth");
    };
    eventBus.on("auth.clearTokens", handler);
    return () => {
      eventBus.off("auth.clearTokens", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearAuthTokens]);

  useEffect(() => {
    const handleLogoutRequest = () => {
      eventBus.emit("auth.logout.started", undefined);

      logoutMutation.mutate(undefined, {
        onSuccess: () => {
          eventBus.emit("auth.logout.completed", undefined);
        },
        onError: (error) => {
          eventBus.emit("auth.logout.failed", { error: String(error) });
        },
      });
    };

    eventBus.on("auth.logout.requested", handleLogoutRequest);
    return () => {
      eventBus.off("auth.logout.requested", handleLogoutRequest);
    };
  }, [logoutMutation]);

  useEffect(() => {
    const handlePassChangeRequest = (changePassPayload: ChangePassPayload) => {
      eventBus.emit("auth.changePassword.started", undefined);

      passChangeMutation.mutate(changePassPayload, {
        onSuccess: () => {
          eventBus.emit("auth.changePassword.completed", undefined);
        },
        onError: (error) => {
          eventBus.emit("auth.changePassword.failed", { error: String(error) });
        },
      });
    };

    eventBus.on("auth.changePassword.requested", handlePassChangeRequest);
    return () => {
      eventBus.off("auth.changePassword.requested", handlePassChangeRequest);
    };
  }, [passChangeMutation]);

  useEffect(() => {
    const handleSendEmailChangeRequest = ({
      updatedEmail,
      toggleFormState,
    }: {
      updatedEmail: string;
      toggleFormState: () => void;
    }) => {
      eventBus.emit("auth.sendEmailUpdateRequest.started", undefined);

      sendEmailUpdateMutation.mutate(updatedEmail, {
        onSuccess: () => {
          toggleFormState();
          eventBus.emit("auth.sendEmailUpdateRequest.completed", undefined);
        },
        onError: (error) => {
          eventBus.emit("auth.sendEmailUpdateRequest.failed", {
            error: String(error),
          });
        },
      });
    };

    eventBus.on(
      "auth.sendEmailUpdateRequest.requested",
      handleSendEmailChangeRequest
    );
    return () => {
      eventBus.off(
        "auth.sendEmailUpdateRequest.requested",
        handleSendEmailChangeRequest
      );
    };
  }, [sendEmailUpdateMutation]);

  useEffect(() => {
    const handleUpdateEmailRequest = ({
      updatedEmail,
      code,
      toggleFormState,
    }: {
      updatedEmail: string;
      code: string;
      toggleFormState: () => void;
    }) => {
      eventBus.emit("auth.updateEmail.started", undefined);

      updatedEmailMutation.mutate(
        { updatedEmail, code },
        {
          onSuccess: () => {
            toggleFormState();
            eventBus.emit("auth.updateEmail.completed", undefined);
          },
          onError: (error) => {
            eventBus.emit("auth.updateEmail.failed", {
              error: String(error),
            });
          },
        }
      );
    };

    eventBus.on("auth.updateEmail.requested", handleUpdateEmailRequest);
    return () => {
      eventBus.off("auth.updateEmail.requested", handleUpdateEmailRequest);
    };
  }, [updatedEmailMutation]);

  useEffect(() => {
    const handler = () => {
      refreshSessionMutation.mutate(undefined, {
        onSuccess: (data) =>
          eventBus.emit("auth.refreshSession.completed", data),
      });
    };
    eventBus.on("auth.refreshSession.requested", handler);
    return () => {
      eventBus.off("auth.refreshSession.requested", handler);
    };
  }, [refreshSessionMutation]);
};

export default useAuthEventListeners;
