import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { useTranslations } from "@/shared/hooks/core";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";

import { postNewEmailVerificationCode } from "../../services";

const useResendEmailVerificationMutation = () => {
  const router = useRouter();

  const { t } = useTranslations();

  return useMutation({
    mutationFn: postNewEmailVerificationCode,
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "auth-translations.module-success-messages.account-activation-request-sent-msg"
        ),
        toastDuration: 4000,
      });
      router.replace("/auth/account_activation_screen");
    },
  });
};

export default useResendEmailVerificationMutation;
