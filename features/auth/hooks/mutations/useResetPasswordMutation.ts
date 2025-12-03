import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import AsyncStorage from "expo-sqlite/kv-store";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";

import { patchUserPasswordReset } from "../../services";

const useResetPasswordMutation = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: patchUserPasswordReset,
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

export default useResetPasswordMutation;
