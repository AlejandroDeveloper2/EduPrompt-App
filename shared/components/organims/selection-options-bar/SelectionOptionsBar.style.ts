import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { AppColors, Radius, Spacing } from "../../../styles";

export const dynamicStyles = (size: SizeType) =>
  StyleSheet.create({
    Container: {
      width: "100%",
      height: "auto",
      paddingVertical:
        size === "mobile" ? Spacing.spacing_xs : Spacing.spacing_sm,
      paddingHorizontal: Spacing.spacing_xl,
      backgroundColor: AppColors.basic.white,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      elevation: 3,
      borderRadius: Radius.radius_lg,
    },
    Slide: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: Spacing.spacing_xs,
    },
  });
