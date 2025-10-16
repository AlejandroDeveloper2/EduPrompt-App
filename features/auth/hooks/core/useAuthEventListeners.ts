import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";

import { ChangePassPayload } from "../../types";

import {
  useChangeUserPassword,
  useLogout,
  useSendUpdateEmailRequest,
  useUpdateUserEmail,
} from "../mutations";

const useAuthEventListeners = () => {
  const logoutMutation = useLogout();
  const passChangeMutation = useChangeUserPassword();
  const sendEmailUpdateMutation = useSendUpdateEmailRequest();
  const updatedEmailMutation = useUpdateUserEmail();

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
};

export default useAuthEventListeners;
