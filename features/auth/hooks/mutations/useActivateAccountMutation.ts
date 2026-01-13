import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { useTranslations } from "@/shared/hooks/core";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";

import { postEmailVerificationCode } from "../../services";

const useActivateAccountMutation = () => {
  const router = useRouter();

  const { t } = useTranslations();

  return useMutation({
    mutationFn: postEmailVerificationCode,
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "auth-translations.module-success-messages.account-activated-msg"
        ),
        toastDuration: 4000,
      });
      router.replace("/auth");
    },
  });
};

export default useActivateAccountMutation;
