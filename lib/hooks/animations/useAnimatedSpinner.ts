import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const useAnimatedSpinner = () => {
  const scales = [useSharedValue(1), useSharedValue(1), useSharedValue(1)];

  const startLoopAnimation = () => {
    [0, 1, 2].forEach((i) => {
      scales[i].value = withDelay(
        i * 500,
        withRepeat(
          withSequence(
            withTiming(1.2, { duration: 500 }),
            withTiming(1, { duration: 500 })
          ),
          -1,
          false
        )
      );
    });
  };

  useEffect(() => {
    startLoopAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedCircleOneStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scales[0].value }],
  }));

  const animatedCircleTwoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scales[1].value }],
  }));

  const animatedCircleThreeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scales[2].value }],
  }));

  const animatedCircleStyles = [
    animatedCircleOneStyle,
    animatedCircleTwoStyle,
    animatedCircleThreeStyle,
  ];

  return {
    animatedCircleStyles,
  };
};

export default useAnimatedSpinner;
