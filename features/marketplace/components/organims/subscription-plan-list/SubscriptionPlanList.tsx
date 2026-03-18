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
    plans,
    isPlansLoading,
    isPopUpMounted,
    animatedPopUpStyle,
    dragGesture,
    onClosePopUp,
    currentPlan,
    handleSubscribeToPlan,
  } = useSubscriptionPlanList();

  return (
    <>
      <PopUp
        title={t("marketplace-translations.plans-section.auth-popup-title")}
        icon="log-in-outline"
        isPopUpMounted={isPopUpMounted}
        gesture={dragGesture}
        animatedPopUpStyle={animatedPopUpStyle}
        onClosePopUp={onClosePopUp}
      >
        <AuthPanel />
      </PopUp>
      {isPlansLoading ? (
        <LoadingTextIndicator
          message={t(
            "marketplace-translations.plans-section.loading-plans-msg",
          )}
          color={AppColors.primary[400]}
        />
      ) : plans ? (
        plans.map((plan) => (
          <TokenPackageCard
            key={plan.subscriptionPlanId}
            price={`${plan.price}USD/${t(
              "marketplace-translations.plans-section.frecuency-label",
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
                "marketplace-translations.packages-section.processing-purchase-msg",
              ),
            }}
            buttonText={
              currentPlan &&
              currentPlan.subscriptionPlanId === plan.subscriptionPlanId
                ? t(
                    "marketplace-translations.plans-section.manage-subscription-btn-label",
                  )
                : `${t(
                    "marketplace-translations.plans-section.subscribe-btn-label",
                  )} ${plan.price}USD/${t(
                    "marketplace-translations.plans-section.frecuency-label",
                  )}`
            }
            onBuyPackage={() => handleSubscribeToPlan(plan)}
          />
        ))
      ) : (
        <Empty
          message={t(
            "marketplace-translations.plans-section.wifi-connection-msg",
          )}
          icon="wifi-outline"
        />
      )}
    </>
  );
};

export default SubscriptionPlanList;
