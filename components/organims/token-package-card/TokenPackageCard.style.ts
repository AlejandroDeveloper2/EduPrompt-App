import { StyleSheet } from "react-native";

import { SizeType } from "@/lib/types";

import { AppColors, Radius, Spacing } from "@/styles";

export const TokenPackageCardStyle = (size: SizeType) =>
  StyleSheet.create({
    CardContainer: {
      width: "100%",
      borderRadius: Radius.radius_lg,
      backgroundColor: AppColors.basic.white,
      display: "flex",
      flexDirection: "column",
      gap: Spacing.spacing_xs,
      justifyContent: "center",
      alignItems: "center",
      borderColor: AppColors.primary[400],
      borderWidth: 1,
      borderStyle: "solid",
      overflow: "hidden",
    },
    PriceSection: {
      width: "100%",
      backgroundColor: AppColors.basic.white,
      justifyContent: "center",
      alignItems: "center",
      gap: Spacing.spacing_xs,
    },
    CardBody: {
      width: "100%",
      backgroundColor: AppColors.primary[400],
      gap: Spacing.spacing_sm,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: Spacing.spacing_lg,
      paddingVertical:
        size === "mobile" ? Spacing.spacing_md : Spacing.spacing_lg,
    },
  });
