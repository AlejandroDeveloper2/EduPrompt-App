import { useMutation } from "@tanstack/react-query";
import * as SecureStorage from "expo-secure-store";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";

import { eventBus } from "@/core/events/EventBus";
import { showToast } from "@/shared/context";

import { generateToastKey } from "@/shared/helpers";

import { postCaptureOrder } from "../../services";

const useCaptureOrderMutation = () => {
  return useMutation({
    mutationFn: postCaptureOrder,
    onSuccess: (data, variables) => {
      if (variables.productDetails.productType === "token_package") {
        console.log(variables);
        eventBus.emit("userProfile.updateTokeUserCoins.requested", {
          amount: variables.productDetails.tokenAmount ?? 0,
          mode: "add",
        });

        showToast({
          key: generateToastKey(),
          variant: "primary",
          message: `Tu pago fue éxitoso, has adquirido el paquete de ${variables.productDetails.tokenAmount ?? 0} tokens.`,
          toastDuration: 10000,
        });
        return;
      }

      if (data.subscriptionId)
        SecureStorage.setItem(
          ASYNC_STORAGE_KEYS.subscriptionId,
          data.subscriptionId,
        );

      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: `Tu pago fue éxitoso, te has suscrito al plan ${variables.productDetails.title}.`,
        toastDuration: 10000,
      });
    },
  });
};

export default useCaptureOrderMutation;
