import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { AppColors, Radius, Spacing } from "../../../styles";

export const NavItemStyle = (size: SizeType) =>
  StyleSheet.create({
    Container: {
      width: "auto",
      height: "auto",
      gap: Spacing.spacing_xs,
      flexDirection: "column",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    NavItemPressable: {
      width: size === "mobile" ? 45 : 60,
      height: size === "mobile" ? 45 : 60,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: Radius.radius_rounded,
      borderWidth: 1,
      borderColor: AppColors.neutral[25],
    },
  });
