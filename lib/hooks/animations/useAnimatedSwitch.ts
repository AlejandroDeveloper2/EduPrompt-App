import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { AppColors } from "@/styles";

const useAnimatedSwitch = (switchState: "on" | "off") => {
  const translateX = useSharedValue(0);
  const backgroundColor = useSharedValue(AppColors.neutral[200]);

  useEffect(() => {
    translateX.value = withTiming(switchState === "on" ? 100 : 0, {
      duration: 400,
    });
    backgroundColor.value = withTiming(
      switchState === "on" ? AppColors.primary[400] : AppColors.neutral[200],
      { duration: 400 }
    );
  }, [backgroundColor, switchState, translateX]);

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: `${translateX.value}%` }],
  }));
  const animatedSwitchStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));

  return {
    animatedIndicatorStyle,
    animatedSwitchStyle,
  };
};

export default useAnimatedSwitch;
