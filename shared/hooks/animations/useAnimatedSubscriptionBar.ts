import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { AppColors } from "../../styles";

const useAnimatedSubscriptionBar = (hasSubscription: boolean) => {
  const background = useSharedValue(
    hasSubscription ? AppColors.primary[400] : AppColors.neutral[0]
  );

  useEffect(() => {
    background.value = withTiming(
      hasSubscription ? AppColors.primary[400] : AppColors.neutral[0],
      { duration: 400 }
    );
  }, [background, hasSubscription]);

  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: background.value,
  }));

  return animatedBackgroundStyle;
};

export default useAnimatedSubscriptionBar;
