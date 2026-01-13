import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "expo-sqlite/kv-store";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

import { showToast } from "@/shared/context";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import { useAuthStore } from "../store";

import { generateToastKey } from "@/shared/helpers";
import { postEmailChangeRequest } from "../../services";

const useSendUpdateEmailRequestMutation = () => {
  const { isConnected } = useCheckNetwork();
  const { token } = useAuthStore();

  const { t } = useTranslations();

  return useMutation({
    mutationFn: async (updatedEmail: string) => {
      if (isConnected && token) {
        const requestResult = await postEmailChangeRequest(updatedEmail);
        return requestResult;
      }
    },
    onSuccess: async (data) => {
      if (!data) return;

      await AsyncStorage.setItem(
        ASYNC_STORAGE_KEYS.userUpdatedEmail,
        data.updatedEmail
      );

      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "auth-translations.module-success-messages.update-email-request-sent-msg"
        ),
      });
    },
  });
};

export default useSendUpdateEmailRequestMutation;
