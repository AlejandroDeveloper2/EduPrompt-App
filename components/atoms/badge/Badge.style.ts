import { StyleSheet } from "react-native";

import { BadgeVariantType, SizeType } from "@/lib/types";

import { AppColors, Radius, Spacing } from "@/styles";

export const BadgeStyle = (size: SizeType, variant: BadgeVariantType) =>
  StyleSheet.create({
    badgeBox: {
      width: "auto",
      height: "auto",
      paddingHorizontal:
        size === "mobile" ? Spacing.spacing_sm : Spacing.spacing_lg,
      paddingVertical:
        size === "mobile" ? Spacing.spacing_2xs : Spacing.spacing_xs,
      display: "flex",
      flexDirection: "row",
      gap: Spacing.spacing_null,
      justifyContent: "center",
      alignContent: "center",
      backgroundColor: AppColors[variant][variant === "neutral" ? 50 : 400],
      borderRadius: Radius.radius_pilled,
    },
  });
