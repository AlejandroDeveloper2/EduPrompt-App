import { ReactNode, useMemo } from "react";

import { eventBus } from "@/core/events/EventBus";

import { useTranslations } from "@/shared/hooks/core";
import { useEventBusToggle, useEventbusValue } from "@/shared/hooks/events";

import { Button } from "@/shared/components/molecules";

const useSubscriptionManagePanel = () => {
  const subscription = useEventbusValue(
    "marketplace.subscription.updated",
    null,
  );
  const isRetrying = useEventbusValue("marketplace.createOrder.loading", false);
  const isPolling = useEventbusValue("marketplace.orderStatus.loading", false);
  const isCancelling = useEventBusToggle(
    "marketplace.cancelSubscription.started",
    [
      "marketplace.cancelSubscription.completed",
      "marketplace.cancelSubscription.failed",
    ],
  );
  const { t, lang } = useTranslations();

  const currentHistory = useMemo(
    () =>
      subscription
        ? subscription.history[subscription.history.length - 1]
        : null,
    [subscription],
  );

  const handleCreateOrder = (): void => {
    if (!currentHistory) return;
    eventBus.emit("marketplace.createOrder.requested", {
      product: {
        productId: currentHistory.plan.subscriptionPlanId,
        title: currentHistory.plan.title[lang],
        description: currentHistory.plan.description[lang],
        price: currentHistory.plan.price,
        productType: "subscription",
      },
      retryPayment: true,
    });
  };

  const Actions: Record<string, ReactNode> = {
    active: (
      <Button
        icon="close-outline"
        variant="danger"
        width="100%"
        label={t(
          "marketplace-translations.manage-subscription-panel.actions-labels.cancel-subscription-btn-label",
        )}
        loading={isCancelling}
        loadingMessage={t(
          "marketplace-translations.manage-subscription-panel.actions-labels.cancel-subscription-btn-loading-msg",
        )}
        onPress={() => {
          if (!subscription || !currentHistory) return;
          eventBus.emit("marketplace.cancelSubscription.requested", {
            subscriptionId: subscription.subscriptionId,
            currentHistoryId: currentHistory.historyId,
          });
        }}
      />
    ),
    cancelled: (
      <Button
        icon="star-outline"
        variant="primary"
        width="100%"
        label={t(
          "marketplace-translations.manage-subscription-panel.actions-labels.reactive-subscription-btn-label",
        )}
        onPress={handleCreateOrder}
        loading={isRetrying}
        loadingMessage={t(
          "marketplace-translations.manage-subscription-panel.actions-labels.processing-payment-msg",
        )}
        disabled={isPolling}
      />
    ),
    failed: (
      <Button
        icon="reload-outline"
        variant="neutral"
        width="100%"
        label={t(
          "marketplace-translations.manage-subscription-panel.actions-labels.retry-payment-btn-label",
        )}
        onPress={handleCreateOrder}
        loading={isRetrying}
        loadingMessage={t(
          "marketplace-translations.manage-subscription-panel.actions-labels.processing-payment-msg",
        )}
        disabled={isPolling}
      />
    ),
  };

  return {
    t,
    currentHistory,
    Actions,
  };
};

export default useSubscriptionManagePanel;
