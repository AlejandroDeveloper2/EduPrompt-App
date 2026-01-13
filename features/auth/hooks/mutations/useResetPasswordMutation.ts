import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import AsyncStorage from "expo-sqlite/kv-store";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

import { useTranslations } from "@/shared/hooks/core";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";

import { patchUserPasswordReset } from "../../services";

const useResetPasswordMutation = () => {
  const router = useRouter();

  const { t } = useTranslations();

  const mutation = useMutation({
    mutationFn: patchUserPasswordReset,
    onSuccess: async () => {
      await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.userIdResetPass);
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "auth-translations.module-success-messages.password-updated-msg"
        ),
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
        message: t(
          "auth-translations.module-error-messages.missing-user-id-msg"
        ),
        toastDuration: 4000,
      });
      return;
    }
    mutation.mutate({ userId, newPassword });
  };

  return { ...mutation, resetUserPassword };
};

export default useResetPasswordMutation;
