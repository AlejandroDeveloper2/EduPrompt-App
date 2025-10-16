import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { AppColors, Radius, Spacing } from "@/shared/styles";

export const FileNavigatorStyle = (size: SizeType) =>
  StyleSheet.create({
    NavigatorContainer: {
      width: "100%",
      flexDirection: "row",
      display: "flex",
      gap: 0,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: AppColors.basic.white,
      borderColor: AppColors.neutral[50],
      borderRadius: Radius.radius_pilled,
      borderWidth: 1,
      overflow: "hidden",
    },
    NavigatorTap: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: Spacing.spacing_xl,
      paddingVertical:
        size === "mobile" ? Spacing.spacing_xs : Spacing.spacing_sm,
    },
  });
