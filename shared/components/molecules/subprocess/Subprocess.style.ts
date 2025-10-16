import { DimensionValue, StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { AppColors, Radius, Spacing } from "../../../styles";

export const SubprocessStyle = (
  size: SizeType,
  subprocessWidth: DimensionValue
) =>
  StyleSheet.create({
    SubprocessContainer: {
      width: subprocessWidth,
      display: "flex",
      flexDirection: "column",
      gap: size === "mobile" ? Spacing.spacing_2xs : Spacing.spacing_xs,
      justifyContent: "center",
      alignItems: "flex-start",
      paddingBottom:
        size === "mobile" ? Spacing.spacing_sm : Spacing.spacing_md,
      paddingHorizontal:
        size === "laptop" ? Spacing.spacing_md : Spacing.spacing_null,
      paddingTop: size === "laptop" ? Spacing.spacing_md : Spacing.spacing_null,
      borderColor: AppColors.neutral[50],
      borderRadius: size === "laptop" ? Radius.radius_lg : Radius.radius_null,
      borderBottomWidth: 1,
      borderLeftWidth: size === "laptop" ? 1 : 0,
      borderRightWidth: size === "laptop" ? 1 : 0,
      borderTopWidth: size === "laptop" ? 1 : 0,
    },
  });
