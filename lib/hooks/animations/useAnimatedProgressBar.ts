/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { ProgressConfig } from "@/lib/types";

const useAnimatedProgressBar = (
  { mode, limit }: ProgressConfig,
  progressPercentage: number
) => {
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    if (mode === "progress-counter")
      progressWidth.value = withTiming(progressPercentage, { duration: 400 });
    else progressWidth.value = withTiming(100, { duration: limit });
  }, [mode, limit, progressPercentage]);

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  return animatedProgressStyle;
};

export default useAnimatedProgressBar;
