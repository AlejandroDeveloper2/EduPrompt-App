import { useEffect } from "react";
import { Dimensions } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { useOnboardingStore } from "../store";

const positionX = Dimensions.get("screen").width;

const useAnimatedOnboarding = () => {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(-positionX);
  const { currentStep } = useOnboardingStore();

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
    translateX.value = withTiming(0, { duration: 500 });
  }, [opacity, translateX, currentStep]);

  const animatedOnboardingStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  const runReverseAnimation = (callback: () => void): void => {
    opacity.value = withTiming(0, { duration: 300 });
    translateX.value = withTiming(positionX, { duration: 300 });
    setTimeout(() => callback(), 300);
  };

  return {
    animatedOnboardingStyle,
    runReverseAnimation,
  };
};

export default useAnimatedOnboarding;
