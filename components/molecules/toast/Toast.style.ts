import { StyleSheet } from "react-native";

import { SizeType, ToastVariantType } from "@/lib/types";

import { AppColors, Radius, Spacing } from "@/styles";

export const ToastStyle = (size: SizeType, variant: ToastVariantType) =>
  StyleSheet.create({
    Container: {
      width: "auto",
      height: "auto",
      maxWidth: 250,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      backgroundColor:
        variant === "neutral" ? AppColors[variant][0] : AppColors[variant][400],
      paddingHorizontal:
        size === "mobile" ? Spacing.spacing_lg : Spacing.spacing_xl,
      paddingVertical:
        size === "mobile" ? Spacing.spacing_md : Spacing.spacing_lg,
      elevation: 3,
      borderRadius: Radius.radius_lg,
    },
  });
