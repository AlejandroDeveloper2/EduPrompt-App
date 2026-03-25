import { useQueryClient } from "@tanstack/react-query";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useEffect, useRef, useState } from "react";

import { showToast } from "@/shared/context";

import { Product } from "../../types";

import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import {
  useCaptureOrderMutation,
  useCreateOrderMutation,
  useRetrySubscriptionPaymentMutation,
} from "../mutations";
import useSubscriptionByUserQuery from "../query/useSubscriptionByUserQuery";
import useOrderStatusPolling from "./useOrderStatusPolling";

import { generateToastKey } from "@/shared/helpers";

const useMarketplace = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [isPollingEnabled, setIsPollingEnabled] = useState<boolean>(false);

  const selectedProductRef = useRef<Product | null>(null);
  const processingRef = useRef(false);
  const retryPaymentRef = useRef(false);

  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();
  const { t } = useTranslations();

  const createOrderMutation = useCreateOrderMutation((orderId) => {
    // Activar polling tan pronto como se crea la orden y se abre el browser
    setActiveOrderId(orderId);
    setIsPollingEnabled(true);
  });
  const captureMutation = useCaptureOrderMutation();
  const retrySubscriptionMutation = useRetrySubscriptionPaymentMutation();

  const { data: subscription } = useSubscriptionByUserQuery();

  useEffect(() => {
    selectedProductRef.current = selectedProduct;
  }, [selectedProduct]);

  const handlePaymentApproved = useCallback(
    (orderId: string) => {
      const product = selectedProductRef.current;
      if (!product || processingRef.current) return;

      processingRef.current = true;
      WebBrowser.dismissBrowser();

      if (retryPaymentRef.current && subscription) {
        return retrySubscriptionMutation.mutate(
          { subscriptionId: subscription.subscriptionId, orderId },
          {
            onSettled: () => {
              processingRef.current = false;
              retryPaymentRef.current = false;
              setActiveOrderId(null);
              setIsPollingEnabled(false);
              queryClient.invalidateQueries({
                queryKey: ["user_profile"],
              });
              queryClient.invalidateQueries({
                queryKey: ["subscription"],
              });
            },
          },
        );
      }

      captureMutation.mutate(
        { orderId, productDetails: product },
        {
          onSettled: () => {
            processingRef.current = false;
            setActiveOrderId(null);
            setIsPollingEnabled(false);
            queryClient.invalidateQueries({
              queryKey: ["user_profile"],
            });
            queryClient.invalidateQueries({
              queryKey: ["subscription"],
            });
          },
        },
      );
    },
    [captureMutation, queryClient, retrySubscriptionMutation, subscription],
  );

  const handlePaymentCancelled = useCallback(() => {
    if (processingRef.current) return;

    processingRef.current = false;
    retryPaymentRef.current = false;

    setActiveOrderId(null);
    setIsPollingEnabled(false);

    WebBrowser.dismissBrowser();
    showToast({
      key: generateToastKey(),
      variant: "danger",
      message: t(
        "marketplace_translations.module_error_messages.cancel_payment_process_msg",
      ),
      toastDuration: 10000,
    });
  }, [t]);

  const { isPolling } = useOrderStatusPolling({
    orderId: activeOrderId,
    enabled: isPollingEnabled,
    intervalMs: 2000,
    maxAttempts: 60,
    onStatusChange: (status, orderId) => {
      if (status === "APPROVED" || status === "COMPLETED") {
        handlePaymentApproved(orderId);
      } else if (status === "CANCELLED") {
        handlePaymentCancelled();
      }
    },
    onTimeout: () => {
      setIsPollingEnabled(false);
      setActiveOrderId(null);
      processingRef.current = false;
      retryPaymentRef.current = false;
      showToast({
        key: generateToastKey(),
        variant: "danger",
        message: t(
        "marketplace_translations.module_error_messages.payment_error_msg",
        ),
        toastDuration: 10000,
      });
    },
  });

  const createPurchase = useCallback(
    (product: Product, retryPayment: boolean): void => {
      if (!isConnected || isConnected === null)
        return showToast({
          key: generateToastKey(),
          variant: "danger",
          message: t(
        "marketplace_translations.module_error_messages.no_internet_connection_msg",
          ),
        });

      retryPaymentRef.current =
        retryPayment && product.productType === "subscription";

      setSelectedProduct(product);
      selectedProductRef.current = product;
      processingRef.current = false;

      createOrderMutation.mutate(product);
    },
    [createOrderMutation, isConnected, t],
  );

  return {
    isProccesingOrder:
      createOrderMutation.isPending || retrySubscriptionMutation.isPending,
    isCompletingOrder: captureMutation.isPending,
    isPolling,
    createPurchase,
  };
};

export default useMarketplace;
