import { useMemo } from "react";
import { DimensionValue } from "react-native";
import Animated from "react-native-reanimated";

import { ToastVariantType } from "@/core/types";

import { dynamicStyles } from "./ToastLoadBar.style";

interface ToastLoadBarProps {
  variant: ToastVariantType;
  animatedWidth: {
    width: DimensionValue;
  };
}

const ToastLoadBar = ({ variant, animatedWidth }: ToastLoadBarProps) => {
  const styles = useMemo(() => dynamicStyles(variant), [variant]);
  return (
    <Animated.View
      style={[styles.LoadIndicator, animatedWidth]}
    ></Animated.View>
  );
};

export default ToastLoadBar;
