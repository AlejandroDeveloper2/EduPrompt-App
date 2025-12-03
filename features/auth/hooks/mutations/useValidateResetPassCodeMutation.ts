import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import AsyncStorage from "expo-sqlite/kv-store";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";

import { postResetPassCode } from "../../services";

const useValidateResetPassCodeMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: postResetPassCode,

    onSuccess: async (data) => {
      await AsyncStorage.setItem(
        ASYNC_STORAGE_KEYS.userIdResetPass,
        data.userId
      );
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message:
          "Código de verificación valido, ya puedes actualizar tu contraseña",
        toastDuration: 4000,
      });
      router.replace("/auth/reset_password_screen");
    },
  });
};

export default useValidateResetPassCodeMutation;
