import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { AppColors } from "@/styles";

const useAnimatedInput = (error: boolean) => {
  const borderColor = useSharedValue(
    error ? AppColors.danger[200] : AppColors.neutral[50]
  );
  const borderWidth = useSharedValue(1);

  const onFocus = (): void => {
    borderColor.value = withTiming(
      error ? AppColors.danger[400] : AppColors.primary[400],
      { duration: 300 }
    );
    borderWidth.value = withTiming(2, { duration: 300 });
  };

  const onBlur = (): void => {
    borderColor.value = withTiming(
      error ? AppColors.danger[200] : AppColors.neutral[50],
      { duration: 300 }
    );
    borderWidth.value = withTiming(1, { duration: 300 });
  };

  useEffect(() => {
    borderColor.value = withTiming(
      error ? AppColors.danger[200] : AppColors.neutral[50],
      { duration: 300 }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const animatedInputStyle = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
    borderWidth: borderWidth.value,
  }));

  return { onFocus, onBlur, animatedInputStyle };
};

export default useAnimatedInput;
