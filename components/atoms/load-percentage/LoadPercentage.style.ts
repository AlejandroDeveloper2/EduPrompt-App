import { StyleSheet } from "react-native";

import { SizeType } from "@/lib/types";

import { AppColors, Radius, Spacing } from "@/styles";

export const LoadPercentageStyle = (size: SizeType) =>
  StyleSheet.create({
    CircleContainer: {
      flex: 1,
      width: "auto",
      height: "auto",
      backgroundColor: AppColors.neutral[0],
      borderRadius: Radius.radius_md,
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      padding: size === "mobile" ? Spacing.spacing_xs : Spacing.spacing_2xs,
    },
  });
