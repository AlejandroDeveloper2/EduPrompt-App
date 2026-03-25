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
        "marketplace_translations.manage_subscription_panel.description",
        )}
        title={t("marketplace_translations.manage_subscription_panel.title")}
        icon="star-outline"
      />
      <View style={SubscriptionManagePanelStyle.DetailsList}>
        <SubscriptionDetail
          label={t(
        "marketplace_translations.manage_subscription_panel.subscription_info_items.start_date_label",
          )}
          value={new Date(currentHistory.startDate).toLocaleDateString()}
          icon="calendar-outline"
        />
        <SubscriptionDetail
          label={t(
        "marketplace_translations.manage_subscription_panel.subscription_info_items.end_date_label",
          )}
          value={new Date(currentHistory.endDate).toLocaleDateString()}
          icon="reload-outline"
        />
        <SubscriptionDetail
          label={t(
        "marketplace_translations.manage_subscription_panel.subscription_info_items.plan_label",
          )}
          value={currentHistory.plan.title["es"]}
          icon="star-outline"
        />
        <SubscriptionDetail
          label={t(
        "marketplace_translations.manage_subscription_panel.subscription_info_items.payment_frecuency_label",
          )}
          value={
            currentHistory.plan.paymentFrecuency === "monthly"
              ? t(
        "marketplace_translations.manage_subscription_panel.subscription_info_items.payment_frecuencies",
                  { count: 0 },
                )
              : t(
        "marketplace_translations.manage_subscription_panel.subscription_info_items.payment_frecuencies",
                  { count: 1 },
                )
          }
          icon="timer-outline"
        />
        <SubscriptionDetail
          label={t(
        "marketplace_translations.manage_subscription_panel.subscription_info_items.subscription_status_label",
          )}
          value={
            currentHistory.status === "active"
              ? t(
        "marketplace_translations.manage_subscription_panel.subscription_info_items.subscription_states",
                  { count: 0 },
                )
              : currentHistory.status === "cancelled"
                ? t(
        "marketplace_translations.manage_subscription_panel.subscription_info_items.subscription_states",
                    { count: 2 },
                  )
                : t(
        "marketplace_translations.manage_subscription_panel.subscription_info_items.subscription_states",
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
