import { useMutation } from "@tanstack/react-query";

import { eventBus } from "@/core/events/EventBus";
import { showToast } from "@/shared/context";

import { useTranslations } from "@/shared/hooks/core";

import { generateToastKey } from "@/shared/helpers";
import { postCaptureOrder } from "../../services";

const useCaptureOrderMutation = () => {
  const { t } = useTranslations();

  return useMutation({
    mutationFn: postCaptureOrder,
    onSuccess: (_data, variables) => {
      if (variables.productDetails.productType === "token_package") {
        eventBus.emit("userProfile.updateTokeUserCoins.requested", {
          amount: variables.productDetails.tokenAmount ?? 0,
          mode: "add",
        });

        showToast({
          key: generateToastKey(),
          variant: "primary",
          message: t(
        "marketplace_translations.module_success_messages.package_order_completed_msg",
            { amount: variables.productDetails.tokenAmount ?? 0 },
          ),
          toastDuration: 6000,
        });
        return;
      }

      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: t(
        "marketplace_translations.module_success_messages.plan_order_completed_msg",
          { plan: variables.productDetails.title },
        ),
        toastDuration: 6000,
      });
    },
  });
};

export default useCaptureOrderMutation;
