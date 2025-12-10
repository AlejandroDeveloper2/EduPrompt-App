import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const SCREEN_WIDTH = Dimensions.get("screen").width;

const useAnimatedFloatMenu = () => {
  const [isDeployed, setIsDeployed] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(isDeployed);

  const translateX = useSharedValue(SCREEN_WIDTH);

  useEffect(() => {
    if (isDeployed) {
      setIsMounted(true);
      translateX.value = withTiming(0, { duration: 600 });
    } else {
      translateX.value = withTiming(SCREEN_WIDTH, { duration: 600 }, () => {
        scheduleOnRN(setIsMounted, false);
      });
    }
  }, [isDeployed, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const toggleDeploy = (): void => {
    setIsDeployed((prev) => !prev);
  };

  return {
    isDeployed,
    isMounted,
    animatedStyle,
    toggleDeploy,
  };
};

export default useAnimatedFloatMenu;
