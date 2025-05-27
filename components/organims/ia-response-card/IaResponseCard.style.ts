import { StyleSheet } from "react-native";

import { SizeType } from "@/lib/types";

import { AppColors, Radius, Spacing } from "@/styles";

export const IaResponseCardStyle = (size: SizeType) =>
  StyleSheet.create({
    Container: {
      width: "100%",
      flexDirection: "column",
      display: "flex",
      gap: Spacing.spacing_md,
      backgroundColor: AppColors.basic.white,
      borderWidth: 1,
      borderColor: AppColors.neutral[50],
      borderRadius: Radius.radius_lg,
      justifyContent: "flex-start",
      alignItems: "center",
      paddingHorizontal:
        size === "mobile" ? Spacing.spacing_md : Spacing.spacing_lg,
      paddingVertical:
        size === "mobile" ? Spacing.spacing_sm : Spacing.spacing_md,
    },
    Header: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    Options: {
      display: "flex",
      justifyContent: "flex-start",
      gap: Spacing.spacing_xs,
      paddingVertical: Spacing.spacing_xs,
    },
  });
