import { View } from "react-native";

import { ToastVariantType } from "@/lib/types";

import { AppColors } from "@/styles";

import { getToastIcon } from "@/lib/helpers";
import { useAnimatedToastLoadBar } from "@/lib/hooks/animations";
import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { ToastLoadBar, Typography } from "@/components/atoms";

import { ToastStyle } from "./Toast.style";

interface ToastProps {
  variant: ToastVariantType;
  message: string;
}

const Toast = ({ variant, message }: ToastProps) => {
  const size = useScreenDimensionsStore();
  const animatedWidth = useAnimatedToastLoadBar();

  const icon = getToastIcon(variant);

  return (
    <View style={ToastStyle(size, variant).Container}>
      <Typography
        text={message}
        weight="medium"
        type="paragraph"
        textAlign="center"
        color={
          variant === "neutral"
            ? AppColors.neutral[1000]
            : AppColors.basic.white
        }
        width="auto"
        icon={icon}
      />
      <ToastLoadBar variant={variant} animatedWidth={animatedWidth} />
    </View>
  );
};

export default Toast;
