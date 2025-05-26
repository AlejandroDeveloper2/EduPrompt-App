import { StyleSheet } from "react-native";

import { SizeType } from "@/lib/types";

import { AppColors, Radius, Spacing } from "@/styles";

export const InfoCardStyle = (size: SizeType) =>
  StyleSheet.create({
    CardContainer: {
      width: "100%",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: Spacing.spacing_md,
      borderRadius: Radius.radius_lg,
      backgroundColor: AppColors.basic.white,
      borderWidth: 1,
      borderColor: AppColors.neutral[50],
      borderStyle: "solid",
      paddingHorizontal:
        size === "mobile" ? Spacing.spacing_md : Spacing.spacing_lg,
      paddingVertical:
        size === "mobile" ? Spacing.spacing_lg : Spacing.spacing_xl,
    },
  });
