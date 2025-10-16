/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Dimensions } from "react-native";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("screen").width;

const useAnimatedToolbar = (selectionMode: boolean, onHidden: () => void) => {
  const translateX = useSharedValue(-SCREEN_WIDTH);

  useEffect(() => {
    if (selectionMode) translateX.value = withSpring(0, { duration: 1000 });
    else
      translateX.value = withTiming(-SCREEN_WIDTH, { duration: 300 }, () => {
        runOnJS(onHidden)();
      });
  }, [selectionMode, translateX]);

  const animatedTranslate = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return animatedTranslate;
};

export default useAnimatedToolbar;
