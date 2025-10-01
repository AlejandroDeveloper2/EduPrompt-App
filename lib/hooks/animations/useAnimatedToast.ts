import { useEffect } from "react";
import { Dimensions } from "react-native";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("screen").width;

const useAnimatedToast = () => {
  const translateX = useSharedValue(SCREEN_WIDTH);

  useEffect(() => {
    translateX.value = withSpring(0, { damping: 15, stiffness: 120 });
  }, [translateX]);

  const animateExit = (onFinish?: () => void) => {
    translateX.value = withSpring(
      SCREEN_WIDTH,
      { damping: 15, stiffness: 120 },
      (isFinished) => {
        if (isFinished && onFinish) {
          runOnJS(onFinish)();
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
