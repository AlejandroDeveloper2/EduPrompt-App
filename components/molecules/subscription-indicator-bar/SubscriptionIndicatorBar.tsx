import { View } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "@/styles";

import { useAnimatedSubscriptionBar } from "@/lib/hooks/animations";
import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { Typography } from "@/components/atoms";
import Button from "../button/Button";

import { SubscriptionIndicatorBarStyle } from "./SubscriptionIndicatorBar.style";

const SubscriptionIndicatorBar = () => {
  const hasSubscription: boolean = false;

  const size = useScreenDimensionsStore();
  const animatedBackgroundStyle = useAnimatedSubscriptionBar(hasSubscription);

  const subscriptionIndicatorBarStyle = SubscriptionIndicatorBarStyle(size);

  return (
    <Animated.View
      style={[
        subscriptionIndicatorBarStyle.BarContainer,
        animatedBackgroundStyle,
      ]}
    >
      <View style={subscriptionIndicatorBarStyle.Content}>
        <View style={subscriptionIndicatorBarStyle.LabelContainer}>
          <Typography
            text="Plan Activo: "
            weight="regular"
            type="button"
            textAlign="left"
            color={
              hasSubscription ? AppColors.basic.white : AppColors.neutral[900]
            }
            width="auto"
            icon="medal-outline"
          />
          <Typography
            text={hasSubscription ? "Premium" : "Gratuito"}
            weight="bold"
            type="button"
            textAlign="left"
            color={
              hasSubscription ? AppColors.basic.white : AppColors.neutral[900]
            }
            width="auto"
          />
        </View>
        <Button
          icon="star-outline"
          variant="neutral"
          width="auto"
          onPress={() => {}}
        />
      </View>
    </Animated.View>
  );
};

export default SubscriptionIndicatorBar;
