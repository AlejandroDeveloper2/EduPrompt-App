import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "expo-sqlite/kv-store";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

import { showToast } from "@/shared/context";

import { useCheckNetwork } from "@/shared/hooks/core";

import { generateToastKey } from "@/shared/helpers";
import { getSessionToken } from "@/shared/utils";
import { postEmailChangeRequest } from "../../services";

const useSendUpdateEmailRequest = () => {
  const { isConnected } = useCheckNetwork();

  return useMutation({
    mutationFn: async (updatedEmail: string) => {
      const token = getSessionToken();

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
        message:
          "Se ha enviado un código de verificación a la nueva dirección de correo electrónico. Revisa tu bandeja de entrada",
      });
    },
  });
};

export default useSendUpdateEmailRequest;
