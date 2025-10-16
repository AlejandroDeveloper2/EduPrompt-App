import { useEffect } from "react";

import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { AppColors } from "../../styles";

const useAnimatedNavItem = (active: boolean, filter?: boolean) => {
  const background = useSharedValue(0);

  useEffect(() => {
    if (active) background.value = withTiming(1, { duration: 400 });
    else background.value = withTiming(0, { duration: 400 });
  }, [active, background]);

  const animatedBackground = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      background.value,
      [0, 1],
      [
        filter ? AppColors.neutral[0] : AppColors.basic.white,
        AppColors.primary[400],
      ]
    ),
  }));

  return animatedBackground;
};
export default useAnimatedNavItem;
