import { useMutation } from "@tanstack/react-query";

import { showToast } from "@/shared/context";

import { useTranslations } from "@/shared/hooks/core";

import { generateToastKey } from "@/shared/helpers";
import { patchSubscriptionPayment } from "../../services";

const useRetrySubscriptionPaymentMutation = () => {
  const { t } = useTranslations();

  return useMutation({
    mutationFn: patchSubscriptionPayment,
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
          "marketplace_translations.module_success_messages.plan_order_completed_msg",
          { plan: "EduPrompt Pro" },
        ),
        toastDuration: 10000,
      });
    },
  });
};

export default useRetrySubscriptionPaymentMutation;
