import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { AppColors, Radius, Spacing } from "@/shared/styles";

export const TokenPackageCardStyle = (size: SizeType, full?: boolean) =>
  StyleSheet.create({
    CardContainer: {
      width: full ? "100%" : size === "laptop" ? 350 : 300,
      borderRadius: Radius.radius_lg,
      backgroundColor: AppColors.basic.white,
      display: "flex",
      flexDirection: "column",
      gap: Spacing.spacing_xs,
      justifyContent: "center",
      alignItems: "center",
      elevation: 5,
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
      backgroundColor: AppColors.basic.white,
      gap: Spacing.spacing_sm,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: Spacing.spacing_lg,
      paddingVertical:
        size === "mobile" ? Spacing.spacing_md : Spacing.spacing_lg,
    },
  });
