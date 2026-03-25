import { useMutation } from "@tanstack/react-query";

import { showToast } from "@/shared/context";

import { useTranslations } from "@/shared/hooks/core";

import { generateToastKey } from "@/shared/helpers";
import { patchSubscriptionCancellation } from "../../services";

const useCancelSubscriptionMutation = () => {
  const { t } = useTranslations();
  return useMutation({
    mutationFn: patchSubscriptionCancellation,
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "marketplace_translations.module_success_messages.plan_cancelled_msg",
        ),
        toastDuration: 4000,
      });
    },
  });
};

export default useCancelSubscriptionMutation;
