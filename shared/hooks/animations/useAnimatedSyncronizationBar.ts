import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { AppColors } from "../../styles";

const useAnimatedSyncronizationBar = (
  isAllSynced: boolean,
  isError: boolean,
) => {
  const background = useSharedValue(
    isAllSynced
      ? AppColors.primary[400]
      : isError
        ? AppColors.danger[400]
        : AppColors.basic.white,
  );

  useEffect(() => {
    background.value = withTiming(
      isAllSynced
        ? AppColors.primary[400]
        : isError
          ? AppColors.danger[400]
          : AppColors.basic.white,
      { duration: 400 },
    );
  }, [background, isAllSynced, isError]);

  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: background.value,
  }));

  return animatedBackgroundStyle;
};

export default useAnimatedSyncronizationBar;
