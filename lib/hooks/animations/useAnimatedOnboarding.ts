import { useEffect } from "react";
import { Dimensions } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { useOnboardingStore, useScreenDimensionsStore } from "../store";

const positionX = Dimensions.get("screen").width;
const positionY = Dimensions.get("screen").height;

const useAnimatedOnboarding = () => {
  const size = useScreenDimensionsStore();

  const opacity = useSharedValue(0);
  const translateX = useSharedValue(-positionX);
  const logoTranslateY = useSharedValue(positionY / 2);
  const logoScale = useSharedValue(size === "mobile" ? 0.6 : 1);
  const boxTranslateY = useSharedValue(positionY);

  const { currentStep } = useOnboardingStore();

  useEffect(() => {
    logoTranslateY.value = withDelay(1000, withTiming(20, { duration: 1000 }));
    logoScale.value = withDelay(
      1000,
      withTiming(size === "mobile" ? 0.5 : 0.8, { duration: 300 })
    );
    boxTranslateY.value = withDelay(1000, withTiming(0, { duration: 1000 }));
  }, [boxTranslateY, logoScale, logoTranslateY, size]);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
    translateX.value = withTiming(0, { duration: 500 });
  }, [opacity, translateX, currentStep]);

  const animatedOnboardingStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: logoTranslateY.value },
      { scale: logoScale.value },
    ],
  }));

  const animatedBoxStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: boxTranslateY.value }],
  }));

  const runReverseAnimation = (callback: () => void): void => {
    opacity.value = withTiming(0, { duration: 300 });
    translateX.value = withTiming(positionX, { duration: 300 });
    setTimeout(() => callback(), 300);
  };

  return {
    animatedOnboardingStyle,
    animatedLogoStyle,
    animatedBoxStyle,
    runReverseAnimation,
  };
};

export default useAnimatedOnboarding;
