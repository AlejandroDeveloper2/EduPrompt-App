import { ButtonVariantType } from "../types";

import { AppColors } from "@/styles";

export const getButtonBackground = (
  variant: ButtonVariantType,
  disabled?: boolean
) => {
  const bg = disabled ? AppColors.neutral[50] : AppColors.basic.white;

  return variant === "neutral" ? bg : AppColors[variant][disabled ? 100 : 400];
};

export const getButtonPressedBackground = (
  variant: ButtonVariantType,
  disabled?: boolean
) => {
  const colorScale = disabled
    ? variant === "neutral"
      ? 50
      : 100
    : variant === "neutral"
    ? 25
    : 500;

  return AppColors[variant][colorScale];
};
