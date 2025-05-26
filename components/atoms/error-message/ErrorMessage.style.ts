import { StyleSheet } from "react-native";

import { SizeType } from "@/lib/types";

import { AppColors, Radius, Spacing } from "@/styles";

export const ErrorMessageStyle = (size: SizeType) =>
  StyleSheet.create({
    ErrorMessageBox: {
      width: "auto",
      height: "auto",
      borderRadius: Radius.radius_pilled,
      backgroundColor: AppColors.danger[400],
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingHorizontal:
        size === "mobile" ? Spacing.spacing_sm : Spacing.spacing_md,
      paddingVertical:
        size === "mobile" ? Spacing.spacing_2xs : Spacing.spacing_xs,
    },
  });
