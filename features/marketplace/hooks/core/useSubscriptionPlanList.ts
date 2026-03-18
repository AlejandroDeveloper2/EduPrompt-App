import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";

import { SubscriptionPlan } from "../../types";

import { useAnimatedPopUp } from "@/shared/hooks/animations";
import { useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useSubscriptionPlansQuery } from "../query";
import useMarketplace from "./useMarketplace";

const useSubscriptionPlanList = () => {
  const router = useRouter();

  const { t, lang } = useTranslations();
  const subscription = useEventbusValue(
    "marketplace.subscription.updated",
    null,
  );
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const { isProccesingOrder, isPolling, createPurchase } = useMarketplace();
  const { data: plans, isLoading: isPlansLoading } =
    useSubscriptionPlansQuery();

  const {
    isPopUpMounted,
    animatedPopUpStyle,
    dragGesture,
    onClosePopUp,
    onOpenPopUp,
  } = useAnimatedPopUp();

  const currentPlan = useMemo(
    () =>
      subscription
        ? subscription.history[subscription.history.length - 1].plan
        : null,
    [subscription],
  );

  const handleSubscribeToPlan = useCallback(
    (plan: SubscriptionPlan) => {
      if (!isAuthenticated) return onOpenPopUp();
      if (
        currentPlan &&
        currentPlan.subscriptionPlanId === plan.subscriptionPlanId
      ) {
        router.navigate("/(tabs)/settings_screen");
        return;
      }
      createPurchase(
        {
          productId: plan.subscriptionPlanId,
          title: plan.title[lang],
          description: plan.description[lang],
          price: plan.price,
          productType: "subscription",
          language: lang,
        },
        false,
      );
    },
    [createPurchase, currentPlan, isAuthenticated, lang, onOpenPopUp, router],
  );

  return {
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
  };
};

export default useSubscriptionPlanList;
