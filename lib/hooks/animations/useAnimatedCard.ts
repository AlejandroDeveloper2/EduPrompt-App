import { useEffect } from "react";
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { AppColors } from "@/styles";

const useAnimatedCard = (selected: boolean) => {
  const borderWidth = useSharedValue(1);
  const borderColor = useSharedValue(AppColors.neutral[50]);
  const background = useSharedValue(0);

  useEffect(() => {
    borderWidth.value = withTiming(selected ? 2 : 1, { duration: 300 });
    borderColor.value = withTiming(
      selected ? AppColors.primary[400] : AppColors.neutral[50],
      { duration: 300 }
    );
    background.value = withTiming(selected ? 1 : 0, { duration: 300 });
  }, [background, borderColor, borderWidth, selected]);

  const animatedCardStyle = useAnimatedStyle(() => ({
    borderWidth: borderWidth.value,
    borderColor: borderColor.value,
    backgroundColor: interpolateColor(
      background.value,
      [0, 1],
      [AppColors.basic.white, AppColors.neutral[0]]
    ),
  }));

  return animatedCardStyle;
};

export default useAnimatedCard;
