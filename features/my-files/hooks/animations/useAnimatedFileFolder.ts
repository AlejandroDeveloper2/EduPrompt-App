import { useEffect } from "react";
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { AppColors } from "@/shared/styles";

const useAnimatedFileFolder = (selected: boolean) => {
  const borderTopWidth = useSharedValue(1);
  const borderTopColor = useSharedValue(0);
  const background = useSharedValue(0);

  useEffect(() => {
    borderTopWidth.value = withTiming(selected ? 2 : 1, { duration: 300 });
    borderTopColor.value = withTiming(selected ? 1 : 0, { duration: 300 });
    background.value = withTiming(selected ? 1 : 0, { duration: 300 });
  }, [background, borderTopColor, borderTopWidth, selected]);

  const animatedFileFolderStyle = useAnimatedStyle(() => ({
    borderTopWidth: borderTopWidth.value,
    borderTopColor: interpolateColor(
      borderTopColor.value,
      [0, 1],
      [AppColors.neutral[50], AppColors.primary[400]]
    ),
    backgroundColor: interpolateColor(
      background.value,
      [0, 1],
      [AppColors.basic.white, AppColors.neutral[0]]
    ),
  }));

  return animatedFileFolderStyle;
};

export default useAnimatedFileFolder;
