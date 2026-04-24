/* eslint-disable react-hooks/exhaustive-deps */
import { Href } from "expo-router";
import { useEffect } from "react";
import Animated from "react-native-reanimated";

import { ToastVariantType } from "@/core/types";

import { AppColors } from "../../../styles";

import { getToastIcon } from "../../../helpers";

import useResponsive from "@/shared/hooks/core/useResponsive";
import {
  useAnimatedToast,
  useAnimatedToastLoadBar,
} from "../../../hooks/animations";

import { ToastLink, ToastLoadBar, Typography } from "../../atoms";

import { dynamicStyles } from "./Toast.style";

interface ToastProps {
  variant: ToastVariantType;
  message: string;
  onRemove: () => void;
  duration?: number;
  link?: {
    label: string;
    href: Href;
  };
}

const Toast = ({
  variant,
  message,
  onRemove,
  link,
  duration = 5000,
}: ToastProps) => {
  const size = useResponsive();
  const animatedWidth = useAnimatedToastLoadBar(duration);
  const { animatedTranslate, animateExit } = useAnimatedToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      animateExit(() => {
        onRemove();
      });
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const icon = getToastIcon(variant);
  const styles = dynamicStyles(size, variant);

  return (
    <Animated.View style={[styles.Container, animatedTranslate]}>
      <Typography
        text={message}
        weight="medium"
        type="paragraph"
        textAlign="left"
        color={
          variant === "neutral"
            ? AppColors.neutral[1000]
            : AppColors.basic.white
        }
        width={200}
        icon={icon}
      />
      {link && <ToastLink label={link.label} href={link.href} />}
      <ToastLoadBar variant={variant} animatedWidth={animatedWidth} />
    </Animated.View>
  );
};

export default Toast;
