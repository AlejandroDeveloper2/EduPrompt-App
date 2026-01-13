import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import AsyncStorage from "expo-sqlite/kv-store";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

import { useTranslations } from "@/shared/hooks/core";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";

import { postResetPassCode } from "../../services";

const useValidateResetPassCodeMutation = () => {
  const router = useRouter();

  const { t } = useTranslations();

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
        message: t(
          "auth-translations.module-success-messages.verification-code-validated-msg"
        ),
        toastDuration: 4000,
      });
      router.replace("/auth/reset_password_screen");
    },
  });
};

export default useValidateResetPassCodeMutation;
