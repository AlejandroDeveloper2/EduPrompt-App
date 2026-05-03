/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { scheduleOnRN } from "react-native-worklets";

const BAR_HEIGHT = 74;

const useAnimatedToolbar = (selectionMode: boolean, onHidden: () => void) => {
  const translateY = useSharedValue(-BAR_HEIGHT);

  useEffect(() => {
    if (selectionMode) {
      translateY.value = withSpring(0, { duration: 1000 });
    } else {
      translateY.value = withTiming(-BAR_HEIGHT, { duration: 300 }, () => {
        scheduleOnRN(onHidden);
      });
    }
  }, [selectionMode, translateY]);

  const animatedTranslate = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return animatedTranslate;
};

export default useAnimatedToolbar;
