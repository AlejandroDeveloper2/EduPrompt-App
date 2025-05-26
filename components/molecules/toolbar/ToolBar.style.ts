import { StyleSheet } from "react-native";

import { SizeType } from "@/lib/types";

import { AppColors, Spacing } from "@/styles";

export const ToolbarStyle = (size: SizeType) =>
  StyleSheet.create({
    Container: {
      width: size === "laptop" ? "100%" : "90%",
      height: "auto",
      paddingVertical: Spacing.spacing_lg,
      paddingHorizontal:
        size === "laptop" ? Spacing.spacing_xl : Spacing.spacing_null,
      backgroundColor: AppColors.basic.white,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomColor: AppColors.neutral[25],
      borderBottomWidth: size === "laptop" ? 1 : 0,
      borderStyle: "solid",
    },
  });
