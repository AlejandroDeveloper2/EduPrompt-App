import { View } from "react-native";

import { useSubscriptionManagePanel } from "@/features/settings/hooks/core";

import { ScreenSection } from "@/shared/components/atoms";
import { SubscriptionDetail } from "../../molecules";

import { SubscriptionManagePanelStyle } from "./SubscriptionManagePanel.style";

const SubscriptionManagePanel = () => {
  const { currentHistory, Actions, t } = useSubscriptionManagePanel();

  if (!currentHistory) return null;

  return (
    <View style={SubscriptionManagePanelStyle.PanelContainer}>
      <ScreenSection
        description={t(
          "marketplace-translations.manage-subscription-panel.description",
        )}
        title={t("marketplace-translations.manage-subscription-panel.title")}
        icon="star-outline"
      />
      <View style={SubscriptionManagePanelStyle.DetailsList}>
        <SubscriptionDetail
          label={t(
            "marketplace-translations.manage-subscription-panel.subscription-info-items.start-date-label",
          )}
          value={new Date(currentHistory.startDate).toLocaleDateString()}
          icon="calendar-outline"
        />
        <SubscriptionDetail
          label={t(
            "marketplace-translations.manage-subscription-panel.subscription-info-items.end-date-label",
          )}
          value={new Date(currentHistory.endDate).toLocaleDateString()}
          icon="reload-outline"
        />
        <SubscriptionDetail
          label={t(
            "marketplace-translations.manage-subscription-panel.subscription-info-items.plan-label",
          )}
          value={currentHistory.plan.title["es"]}
          icon="star-outline"
        />
        <SubscriptionDetail
          label={t(
            "marketplace-translations.manage-subscription-panel.subscription-info-items.payment-frecuency-label",
          )}
          value={
            currentHistory.plan.paymentFrecuency === "monthly"
              ? t(
                  "marketplace-translations.manage-subscription-panel.subscription-info-items.payment-frecuencies",
                  { count: 0 },
                )
              : t(
                  "marketplace-translations.manage-subscription-panel.subscription-info-items.payment-frecuencies",
                  { count: 1 },
                )
          }
          icon="timer-outline"
        />
        <SubscriptionDetail
          label={t(
            "marketplace-translations.manage-subscription-panel.subscription-info-items.subscription-status-label",
          )}
          value={
            currentHistory.status === "active"
              ? t(
                  "marketplace-translations.manage-subscription-panel.subscription-info-items.subscription-states",
                  { count: 0 },
                )
              : currentHistory.status === "cancelled"
                ? t(
                    "marketplace-translations.manage-subscription-panel.subscription-info-items.subscription-states",
                    { count: 2 },
                  )
                : t(
                    "marketplace-translations.manage-subscription-panel.subscription-info-items.subscription-states",
                    { count: 1 },
                  )
          }
          icon="shapes-outline"
          badge
          status={currentHistory.status}
        />
      </View>
      {Actions[currentHistory.status]}
    </View>
  );
};

export default SubscriptionManagePanel;
