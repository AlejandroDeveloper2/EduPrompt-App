import { Ionicons } from "@expo/vector-icons";

import { ToastVariantType } from "@/core/types";

export const getToastIcon = (variant: ToastVariantType) => {
  const icon: keyof typeof Ionicons.glyphMap =
    variant === "primary"
      ? "checkmark"
      : variant === "danger"
      ? "warning-outline"
      : "information-outline";

  return icon;
};
