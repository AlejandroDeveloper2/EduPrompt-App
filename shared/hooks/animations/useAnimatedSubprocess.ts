import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const useAnimatedSubprocess = (onRemove: () => void) => {
  const opacity = useSharedValue(0);

  const runEntryAnimation = (): void => {
    opacity.value = withTiming(1, { duration: 300 });
  };

  const runRemovingAnimation = (): void => {
    opacity.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(onRemove)();
    });
  };

  const animatedOpacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return {
    animatedOpacityStyle,
    runEntryAnimation,
    runRemovingAnimation,
  };
};

export default useAnimatedSubprocess;
