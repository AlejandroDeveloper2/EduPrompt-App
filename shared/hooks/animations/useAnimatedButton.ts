import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { ButtonVariantType } from "@/core/types";

import { getButtonBackground, getButtonPressedBackground } from "../../helpers";

const useAnimatedButton = (variant: ButtonVariantType, disabled?: boolean) => {
  const defaultBG = getButtonBackground(variant, disabled);
  const pressedBG = getButtonPressedBackground(variant, disabled);

  const background = useSharedValue(0);

  const onPressIn = (): void => {
    background.value = withTiming(1, { duration: 300 });
  };

  const onPressOut = (): void => {
    background.value = withTiming(0, { duration: 300 });
  };

  const animatedBackground = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      background.value,
      [0, 1],
      [defaultBG, pressedBG]
    ),
  }));

  return {
    animatedBackground,
    onPressIn,
    onPressOut,
  };
};

export default useAnimatedButton;
