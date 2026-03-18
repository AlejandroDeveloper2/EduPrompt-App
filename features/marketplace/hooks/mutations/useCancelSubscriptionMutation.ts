import { useMutation } from "@tanstack/react-query";

import { showToast } from "@/shared/context";

import { generateToastKey } from "@/shared/helpers";
import { patchSubscriptionCancellation } from "../../services";

const useCancelSubscriptionMutation = () => {
  return useMutation({
    mutationFn: patchSubscriptionCancellation,
    onSuccess: () => {
      showToast({
        key: generateToastKey(),
        variant: "primary",
        message:
          "Tu suscripción ha sido cancelada, puedes reactivarla cuando quieras.",
        toastDuration: 4000,
      });
    },
  });
};

export default useCancelSubscriptionMutation;
