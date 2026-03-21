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
            "marketplace-translations.module-success-messages.package-order-completed-msg",
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
          "marketplace-translations.module-success-messages.plan-order-completed-msg",
          { plan: variables.productDetails.title },
        ),
        toastDuration: 6000,
      });
    },
  });
};

export default useCaptureOrderMutation;
