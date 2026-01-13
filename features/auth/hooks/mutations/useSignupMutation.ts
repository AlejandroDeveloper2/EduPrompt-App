import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { useTranslations } from "@/shared/hooks/core";

import { postSignup } from "../../services";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";

const useSignupMutation = () => {
  const router = useRouter();

  const { t } = useTranslations();

  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "auth-translations.sign-up-template.module-success-messages.account-created-msg"
        ),
        toastDuration: 4000,
      });
      router.replace("/auth/account_activation_screen");
    },
  });
};
export default useSignupMutation;
