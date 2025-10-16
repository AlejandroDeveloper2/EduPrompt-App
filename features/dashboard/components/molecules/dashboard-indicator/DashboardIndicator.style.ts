import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { AppColors, Radius, Spacing } from "@/shared/styles";

export const DashboardIndicatorStyle = (size: SizeType) =>
  StyleSheet.create({
    IndicatorContainer: {
      // width: "100%",
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
    ValueIndicator: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: Spacing.spacing_2xs,
    },
  });
