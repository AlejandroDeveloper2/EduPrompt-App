import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "expo-sqlite/kv-store";

import { ASYNC_STORAGE_KEYS } from "@/lib/constants";

import { showToast } from "@/lib/context";

import { useCheckNetwork } from "../../core";

import { generateToastKey, getSessionToken } from "@/lib/helpers";
import { postEmailChangeRequest } from "@/services/auth";

const useSendUpdateEmailRequest = (toggleFormState: () => void) => {
  const { isConnected } = useCheckNetwork();

  return useMutation({
    mutationFn: async (updatedEmail: string) => {
      const token = await getSessionToken();

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

      toggleFormState();

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
