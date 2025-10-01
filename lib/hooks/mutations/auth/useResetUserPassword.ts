import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import AsyncStorage from "expo-sqlite/kv-store";

import { ASYNC_STORAGE_KEYS } from "@/lib/constants";

import { ResetPassPayload } from "@/lib/types/data-types";

import { showToast } from "@/lib/context";
import { generateToastKey } from "@/lib/helpers";

import { patchUserPasswordReset } from "@/services/auth";

const useResetUserPassword = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (resetPassPayload: ResetPassPayload) => {
      await patchUserPasswordReset(resetPassPayload);
    },
    onSuccess: async () => {
      await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.userIdResetPass);
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "Contraseña actualizada con éxito, ya puedes iniciar sesión",
        toastDuration: 4000,
      });
      router.replace("/auth");
    },
  });

  const resetUserPassword = async (newPassword: string) => {
    const userId = await AsyncStorage.getItem(
      ASYNC_STORAGE_KEYS.userIdResetPass
    );
    if (!userId) {
      showToast({
        key: generateToastKey(),
        variant: "danger",
        message:
          "No se encontró el Id de usuario necesario para actualizar la contraseña",
        toastDuration: 4000,
      });
      return;
    }
    mutation.mutate({ userId, newPassword });
  };

  return { ...mutation, resetUserPassword };
};

export default useResetUserPassword;
