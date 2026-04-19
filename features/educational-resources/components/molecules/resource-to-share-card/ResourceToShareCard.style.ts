import { StyleSheet, ViewStyle } from "react-native";

import { SizeType } from "@/core/types";

import { AppColors, Radius, Spacing } from "@/shared/styles";

const sharedStyle: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const resourceCardStyle = (size: SizeType) =>
  StyleSheet.create({
    CardContainer: {
      width: "100%",
      height: "auto",
      borderRadius: Radius.radius_lg,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      borderWidth: 1,
      borderColor: AppColors.neutral[50],
      gap: size === "mobile" ? Spacing.spacing_sm : Spacing.spacing_md,
      paddingHorizontal:
        size === "mobile" ? Spacing.spacing_md : Spacing.spacing_lg,
      paddingTop: size === "mobile" ? Spacing.spacing_sm : Spacing.spacing_md,
      paddingBottom:
        size === "mobile" ? Spacing.spacing_md : Spacing.spacing_xl,
      borderStyle: "solid",
    },
    CardHeader: sharedStyle,
    CardTags: {
      flexDirection: "row",
      display: "flex",
      gap: Spacing.spacing_2xs,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    CardContent: sharedStyle,
  });

export const dynamicStyles = (size: SizeType) =>
  StyleSheet.create({
    ...resourceCardStyle(size),
    FileMetadata: {
      flexDirection: "row",
      display: "flex",
      gap: Spacing.spacing_xs,
      justifyContent: "flex-start",
      alignItems: "center",
    },
  });
