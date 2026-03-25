import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";

import { useTranslations } from "@/shared/hooks/core";

import { postResetPassRequest } from "../../services";

const useSendResetPassRequestMutation = () => {
  const router = useRouter();
  const { t } = useTranslations();

  return useMutation({
    mutationFn: postResetPassRequest,
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "auth_translations.module_success_messages.reset_pass_request_sent_msg"
        ),
        toastDuration: 4000,
      });
      router.navigate("/auth/verify_reset_pass_code_screen");
    },
  });
};

export default useSendResetPassRequestMutation;
