import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const useAnimatedToastBar = (duration: number) => {
  const width = useSharedValue(100);

  useEffect(() => {
    const startAnimation = () => {
      width.value = withTiming(0, { duration });
    };
    startAnimation();
  }, [width, duration]);

  const animatedWidth = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return animatedWidth;
};

export default useAnimatedToastBar;
