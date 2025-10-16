import { DimensionValue } from "react-native";
import Animated from "react-native-reanimated";

import { ToastVariantType } from "@/core/types";

import { ToastLoadBarStyle } from "./ToastLoadBar.style";

interface ToastLoadBarProps {
  variant: ToastVariantType;
  animatedWidth: {
    width: DimensionValue;
  };
}

const ToastLoadBar = ({ variant, animatedWidth }: ToastLoadBarProps) => {
  return (
    <Animated.View
      style={[ToastLoadBarStyle(variant).LoadIndicator, animatedWidth]}
    ></Animated.View>
  );
};

export default ToastLoadBar;
