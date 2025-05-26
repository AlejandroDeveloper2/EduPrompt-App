import { StyleSheet } from "react-native";

import { SizeType } from "@/lib/types";

import { AppColors, Radius, Spacing } from "@/styles";

export const DashboardIndicatorStyle = (size: SizeType) =>
  StyleSheet.create({
    IndicatorContainer: {
      flex: 1,
      width: "100%",
      height: "auto",
      backgroundColor: AppColors.basic.white,
      borderColor: AppColors.neutral[50],
      borderWidth: 1,
      borderRadius: Radius.radius_lg,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: Spacing.spacing_xs,
      paddingHorizontal:
        size === "mobile" ? Spacing.spacing_md : Spacing.spacing_lg,
      paddingVertical:
        size === "mobile" ? Spacing.spacing_sm : Spacing.spacing_md,
    },
  });
