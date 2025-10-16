import { ButtonVariantType } from "@/core/types";

import { AppColors } from "../styles";

export const getButtonColorLabel = (
  variant: ButtonVariantType,
  disabled?: boolean
): string => {
  return disabled
    ? AppColors.neutral[500]
    : variant === "neutral"
    ? AppColors.neutral[1000]
    : AppColors.basic.white;
};
