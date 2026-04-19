import { AppColors } from "@/shared/styles";

import { useSubscriptionPlanList } from "@/features/marketplace/hooks/core";

import { SubscriptionPlan } from "@/shared/components/atoms";
import { Empty, LoadingTextIndicator } from "@/shared/components/molecules";
import { PopUp } from "@/shared/components/organims";
import TokenPackageCard from "../token-package-card/TokenPackageCard";
import AuthPanel from "./AuthPanel";

const SubscriptionPlanList = () => {
  const {
    t,
    lang,
    isProccesingOrder,
    isPolling,
    isError,
    plans,
    isPlansLoading,
    isOpen,
    closePopUp,
    currentPlan,
    handleSubscribeToPlan,
  } = useSubscriptionPlanList();

  return (
    <>
      <PopUp
        title={t("marketplace_translations.plans_section.auth_popup_title")}
        icon="log-in-outline"
        isOpen={isOpen}
        onClose={closePopUp}
      >
        <AuthPanel closePopUp={closePopUp} />
      </PopUp>
      {isPlansLoading ? (
        <LoadingTextIndicator
          message={t(
            "marketplace_translations.plans_section.loading_plans_msg",
          )}
          color={AppColors.primary[400]}
        />
      ) : plans ? (
        plans.map((plan) => (
          <TokenPackageCard
            key={plan.subscriptionPlanId}
            price={`${plan.price}USD/${t(
              "marketplace_translations.plans_section.frecuency_label",
            )}`}
            packageTitle={plan.title[lang]}
            description={plan.description[lang]}
            SvgIcon={<SubscriptionPlan />}
            buttonIcon={
              currentPlan &&
              currentPlan.subscriptionPlanId === plan.subscriptionPlanId
                ? "settings-outline"
                : undefined
            }
            buttonDisabled={isPolling}
            full
            loading={{
              isLoading: isProccesingOrder,
              message: t(
                "marketplace_translations.packages_section.processing_purchase_msg",
              ),
            }}
            buttonText={
              currentPlan &&
              currentPlan.subscriptionPlanId === plan.subscriptionPlanId
                ? t(
                    "marketplace_translations.plans_section.manage_subscription_btn_label",
                  )
                : `${t(
                    "marketplace_translations.plans_section.subscribe_btn_label",
                  )} ${plan.price}USD/${t(
                    "marketplace_translations.plans_section.frecuency_label",
                  )}`
            }
            onBuyPackage={() => handleSubscribeToPlan(plan)}
          />
        ))
      ) : (
        <Empty
          message={
            isError
              ? t("marketplace_translations.plans_section.error_msg")
              : t("marketplace_translations.plans_section.wifi_connection_msg")
          }
          icon={isError ? "close-outline" : "wifi-outline"}
        />
      )}
    </>
  );
};

export default SubscriptionPlanList;
