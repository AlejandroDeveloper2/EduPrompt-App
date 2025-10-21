import { useEffect } from "react";
import { Dimensions } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const SCREEN_WIDTH = Dimensions.get("screen").width;

const useAnimatedToast = () => {
  const translateX = useSharedValue(SCREEN_WIDTH);

  useEffect(() => {
    translateX.value = withTiming(0, { duration: 400 });
  }, [translateX]);

  const animateExit = (onFinish?: () => void) => {
    translateX.value = withTiming(
      SCREEN_WIDTH,
      { duration: 400 },
      (isFinished) => {
        if (isFinished && onFinish) {
          scheduleOnRN(onFinish);
        }
      }
    );
  };

  const animatedTranslate = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return { animatedTranslate, animateExit };
};
export default useAnimatedToast;
