import { useQueryClient } from "@tanstack/react-query";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useEffect, useRef, useState } from "react";

import { showToast } from "@/shared/context";

import { Product } from "../../types";

import { useCheckNetwork } from "@/shared/hooks/core";
import { useCaptureOrderMutation, useCreateOrderMutation } from "../mutations";
import useOrderStatusPolling from "./useOrderStatusPolling";

import { generateToastKey } from "@/shared/helpers";

const useMarketplace = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [isPollingEnabled, setIsPollingEnabled] = useState<boolean>(false);

  const selectedProductRef = useRef<Product | null>(null);
  const processingRef = useRef(false);

  const queryClient = useQueryClient();
  const { isConnected } = useCheckNetwork();

  const createOrderMutation = useCreateOrderMutation((orderId) => {
    // Activar polling tan pronto como se crea la orden y se abre el browser
    setActiveOrderId(orderId);
    setIsPollingEnabled(true);
  });
  const captureMutation = useCaptureOrderMutation();

  useEffect(() => {
    selectedProductRef.current = selectedProduct;
  }, [selectedProduct]);

  const handlePaymentApproved = useCallback(
    (orderId: string) => {
      const product = selectedProductRef.current;
      if (!product || processingRef.current) return;

      processingRef.current = true;
      WebBrowser.dismissBrowser();

      captureMutation.mutate(
        { orderId, productDetails: product },
        {
          onSettled: () => {
            processingRef.current = false;
            setActiveOrderId(null);
            setIsPollingEnabled(false);
            queryClient.invalidateQueries({ queryKey: ["user_profile"] });
          },
        },
      );
    },
    [captureMutation, queryClient],
  );

  const handlePaymentCancelled = useCallback(() => {
    if (processingRef.current) return;
    processingRef.current = false;
    setActiveOrderId(null);
    setIsPollingEnabled(false);
    WebBrowser.dismissBrowser();
    showToast({
      key: generateToastKey(),
      variant: "danger",
      message: "Cancelaste el proceso de pago.",
      toastDuration: 10000,
    });
  }, []);

  useOrderStatusPolling({
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
      showToast({
        key: generateToastKey(),
        variant: "danger",
        message: "No pudimos completar tu pago. Intenta de nuevo.",
        toastDuration: 10000,
      });
    },
  });

  const createPurchase = useCallback(
    (product: Product): void => {
      if (!isConnected || isConnected === null)
        return showToast({
          key: generateToastKey(),
          variant: "danger",
          message: "Para efectuar la compra debes conectarte a internet.",
        });

      setSelectedProduct(product);
      selectedProductRef.current = product;
      processingRef.current = false;

      createOrderMutation.mutate(product);
    },
    [createOrderMutation, isConnected],
  );

  return {
    isProccesingOrder: createOrderMutation.isPending,
    isCompletingOrder: captureMutation.isPending,
    createPurchase,
  };
};

export default useMarketplace;
