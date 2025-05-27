import { StyleSheet } from "react-native";

import { SizeType } from "@/lib/types";

import { AppColors, Radius, Spacing } from "@/styles";

export const TokenBadgeStyle = (size: SizeType) =>
  StyleSheet.create({
    Container: {
      width: "auto",
      height: size === "mobile" ? 45 : 60,
      borderRadius: Radius.radius_pilled,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: Spacing.spacing_xs,
      paddingHorizontal:
        size === "mobile" ? Spacing.spacing_sm : Spacing.spacing_md,
      paddingVertical:
        size === "mobile" ? Spacing.spacing_2xs : Spacing.spacing_xs,
      backgroundColor: AppColors.basic.white,
      borderWidth: 1,
      borderColor: AppColors.neutral[50],
      borderStyle: "solid",
    },
  });
