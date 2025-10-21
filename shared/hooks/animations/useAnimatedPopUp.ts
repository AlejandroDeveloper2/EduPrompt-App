import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const { height } = Dimensions.get("window");

const useAnimatedPopUp = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState<boolean>(false);
  const [isPopUpMounted, setIsPopUpMounted] = useState<boolean>(isPopUpVisible);

  const translateY = useSharedValue(height);

  useEffect(() => {
    if (isPopUpVisible) {
      setIsPopUpMounted(true);
      translateY.value = withTiming(0, { duration: 400 });
    } else {
      translateY.value = withTiming(height, { duration: 400 }, () => {
        scheduleOnRN(setIsPopUpMounted, false);
      });
    }
  }, [isPopUpVisible, translateY]);

  const animatedPopUpStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const onOpenPopUp = (): void => {
    setIsPopUpVisible(true);
  };

  const onClosePopUp = (): void => {
    setIsPopUpVisible(false);
  };

  const dragGesture = Gesture.Pan()
    .simultaneousWithExternalGesture(Gesture.Native())
    .onUpdate((event) => {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (event.translationY > 100) {
        scheduleOnRN(onClosePopUp);
      } else {
        translateY.value = withTiming(0, { duration: 400 });
      }
    });

  return {
    isPopUpMounted,
    isPopUpVisible,
    animatedPopUpStyle,
    dragGesture,
    onOpenPopUp,
    onClosePopUp,
  };
};

export default useAnimatedPopUp;
