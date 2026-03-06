import { useQueryClient } from "@tanstack/react-query";
import * as Linking from "expo-linking";
import * as SecureStorage from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useEffect, useRef, useState } from "react";

import { config } from "@/core/config/enviromentVariables";

import { eventBus } from "@/core/events/EventBus";
import { APP_SCHEME, ASYNC_STORAGE_KEYS } from "@/shared/constants";
import { AppColors } from "@/shared/styles";

import { showToast } from "@/shared/context";

import { PayPalMessageType, Product } from "../../types";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useCaptureOrderMutation, useCreateOrderMutation } from "../mutations";

import { generateToastKey } from "@/shared/helpers";

const useMarketplace = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const processingRef = useRef(false);

  const queryClient = useQueryClient();

  const { isConnected } = useCheckNetwork();

  const createOrderMutation = useCreateOrderMutation();
  const captureMutation = useCaptureOrderMutation();

  const handleDeepLink = useCallback(
    async ({ url, product }: { url: string; product: Product | null }) => {
      if (!url.includes(`${APP_SCHEME}://payment`) || processingRef.current)
        return;

      processingRef.current = true;
      WebBrowser.dismissBrowser();

      const { queryParams } = Linking.parse(url);
      const status = queryParams?.status as PayPalMessageType;
      const orderId = queryParams?.orderId as string;

      if (status === "success" && orderId && product) {
        console.log(orderId);
        captureMutation.mutate(
          {
            orderId,
            productDetails: product,
          },
          {
            onSuccess: (data, variables) => {
              console.log("Resultado:" + data);
              if (product.productType === "token_package") {
                eventBus.emit("userProfile.updateTokeUserCoins.requested", {
                  amount: product.tokenAmount ?? 0,
                  mode: "add",
                });

                showToast({
                  key: generateToastKey(),
                  variant: "primary",
                  message: `Tu pago fue éxitoso, has adquirido el paquete ${variables.productDetails.title}.`,
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
              });
            },
            onSettled: () => {
              queryClient.invalidateQueries({ queryKey: ["user_profile"] });
            },
          },
        );
      } else if (status === "cancelled") {
        showToast({
          key: generateToastKey(),
          variant: "danger",
          message: "Cancelaste el proceso de pago.",
        });
      } else if (status === "error") {
        showToast({
          key: generateToastKey(),
          variant: "danger",
          message: "Hubo un error en el proceso de pago.",
        });
      }
    },
    [captureMutation, queryClient],
  );

  const createPurchase = useCallback(
    (product: Product): void => {
      if (!isConnected || isConnected === null)
        return showToast({
          key: generateToastKey(),
          variant: "danger",
          message: "Para efectuar la compra debes conectarte a internet.",
        });

      setSelectedProduct(product);

      createOrderMutation.mutate(product, {
        onSuccess: async (result) => {
          const paymentUrl = `${config.nextjsUrl}/payment?orderId=${result.orderId}&scheme=${APP_SCHEME}`;

          await WebBrowser.openBrowserAsync(paymentUrl, {
            presentationStyle:
              WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
            toolbarColor: AppColors.primary[400],
            controlsColor: AppColors.basic.white,
            showTitle: true,
          });
        },
      });
    },
    [createOrderMutation, isConnected],
  );

  useEffect(() => {
    const subscription = Linking.addEventListener("url", (event) =>
      handleDeepLink({ url: event.url, product: selectedProduct }),
    );
    return () => subscription.remove();
  }, [handleDeepLink, selectedProduct]);

  return {
    isProccesingOrder: createOrderMutation.isPending,
    isCompletingOrder: captureMutation.isPending,
    createPurchase,
  };
};

export default useMarketplace;
