import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";

import { Product } from "../../types";

import { useMarketplace } from "../core";
import { useCancelSubscriptionMutation } from "../mutations";
import { useSubscriptionByUser } from "../query";

const useMarketplaceEventsListener = () => {
  useSubscriptionByUser();

  const cancelMutation = useCancelSubscriptionMutation();
  const { createPurchase, isProccesingOrder } = useMarketplace();

  useEffect(() => {
    const handleCancelSubscriptionRequest = (payload: {
      subscriptionId: string;
      currentHistoryId: string;
    }) => {
      eventBus.emit("marketplace.cancelSubscription.started", undefined);
      cancelMutation.mutate(payload, {
        onSuccess: () => {
          eventBus.emit("marketplace.cancelSubscription.completed", undefined);
        },
        onError: (error) => {
          eventBus.emit("marketplace.cancelSubscription.failed", {
            error: String(error),
          });
        },
      });
    };

    eventBus.on(
      "marketplace.cancelSubscription.requested",
      handleCancelSubscriptionRequest,
    );
    return () => {
      eventBus.off(
        "marketplace.cancelSubscription.requested",
        handleCancelSubscriptionRequest,
      );
    };
  }, [cancelMutation]);

  useEffect(() => {
    eventBus.emit("marketplace.createOrder.loading", isProccesingOrder);
  }, [isProccesingOrder]);

  useEffect(() => {
    const handleCreatePurchase = ({
      product,
      retryPayment,
    }: {
      product: Product;
      retryPayment: boolean;
    }) => {
      createPurchase(product, retryPayment);
    };

    eventBus.on("marketplace.createOrder.requested", handleCreatePurchase);

    return () => {
      eventBus.off("marketplace.createOrder.requested", handleCreatePurchase);
    };
  }, [createPurchase, isProccesingOrder]);
};

export default useMarketplaceEventsListener;
