import { View } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "../../../styles";

import {
  useCheckPremium,
  useResponsive,
  useTranslations,
} from "@/shared/hooks/core";
import { useAnimatedSubscriptionBar } from "../../../hooks/animations";

import { Typography } from "../../atoms";

import { dynamicStyles } from "./SubscriptionIndicatorBar.style";

const SubscriptionIndicatorBar = () => {
  const size = useResponsive();
  const isPremium = useCheckPremium();
  const animatedBackgroundStyle = useAnimatedSubscriptionBar(isPremium);
  const { t } = useTranslations();

  const styles = dynamicStyles(size);

  return (
    <Animated.View style={[styles.BarContainer, animatedBackgroundStyle]}>
      <View style={styles.Content}>
        <View style={styles.LabelContainer}>
          <Typography
            text={t("common_translations.subscription_indicator_labels.label")}
            weight="regular"
            type="button"
            textAlign="left"
            color={isPremium ? AppColors.basic.white : AppColors.neutral[900]}
            width="auto"
            icon="medal-outline"
          />
          <Typography
            text={
              isPremium
                ? t(
                    "common_translations.subscription_indicator_labels.premium_plan",
                  )
                : t(
                    "common_translations.subscription_indicator_labels.free_plan",
                  )
            }
            weight="bold"
            type="button"
            textAlign="left"
            color={isPremium ? AppColors.basic.white : AppColors.neutral[900]}
            width="auto"
          />
        </View>
      </View>
    </Animated.View>
  );
};

export default SubscriptionIndicatorBar;
