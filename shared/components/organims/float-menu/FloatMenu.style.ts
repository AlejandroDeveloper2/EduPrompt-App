import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { AppColors, Radius, Spacing } from "@/shared/styles";

export const FloatMenuStyle = (size: SizeType) =>
  StyleSheet.create({
    FloatMenuContainer: {
      width: size === "mobile" ? 250 : 280,
      backgroundColor: AppColors.basic.white,
      flexDirection: "column",
      gap: Spacing.spacing_null,
      justifyContent: "center",
      alignItems: "flex-start",
      elevation: 4,
      borderRadius: Radius.radius_lg,
      zIndex: 20,
      position: "absolute",
      top: Spacing.spacing_4xl * 3,
      right: Spacing.spacing_xl,
      overflow: "hidden",
    },
  });
