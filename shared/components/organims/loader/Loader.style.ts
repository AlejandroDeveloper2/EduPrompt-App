import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { AppColors, Radius, Spacing } from "../../../styles";

export const LoaderStyle = (size: SizeType) =>
  StyleSheet.create({
    LoaderContainer: {
      width: "100%",
      backgroundColor: AppColors.basic.white,
      borderRadius: Radius.radius_lg,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: Spacing.spacing_sm,
      paddingHorizontal:
        size === "mobile" ? Spacing.spacing_xl : Spacing.spacing_3xl,
      paddingVertical:
        size === "mobile" ? Spacing.spacing_xl : Spacing.spacing_2xl,
    },
  });
