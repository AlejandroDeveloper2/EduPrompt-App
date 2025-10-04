import { StyleSheet } from "react-native";

import { SizeType } from "@/lib/types";

import { AppColors, Radius, Spacing } from "@/styles";

export const SwitchStyle = (size: SizeType, labelDirection: "right" | "left") =>
  StyleSheet.create({
    SwitchContainer: {
      width: "100%",
      display: "flex",
      flexDirection: labelDirection === "left" ? "row-reverse" : "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    SwitchPressable: {
      width: size === "mobile" ? 60 : 80,
      height: "auto",
      elevation: 3,
      flexDirection: "row",
      gap: Spacing.spacing_null,
      padding: Spacing.spacing_null,
    },
    Indicator: {
      width: size === "mobile" ? 30 : 40,
      height: size === "mobile" ? 30 : 40,
      backgroundColor: AppColors.basic.white,
      elevation: 3,
      borderRadius: Radius.radius_rounded,
    },
  });
