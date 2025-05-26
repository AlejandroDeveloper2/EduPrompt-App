import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const { height } = Dimensions.get("window");

const useAnimatedPopUp = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState<boolean>(false);
  const [isPopUpMounted, setIsPopUpMounted] = useState<boolean>(isPopUpVisible);

  const translateY = useSharedValue(height);

  useEffect(() => {
    if (isPopUpVisible) {
      setIsPopUpMounted(true);
      translateY.value = withSpring(0, { damping: 15 });
    } else {
      translateY.value = withTiming(height, { duration: 300 }, () => {
        runOnJS(setIsPopUpMounted)(false);
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
        runOnJS(onClosePopUp)();
      } else {
        translateY.value = withSpring(0, { damping: 15 });
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
