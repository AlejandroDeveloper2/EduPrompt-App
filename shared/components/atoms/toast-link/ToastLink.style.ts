import { StyleSheet } from "react-native";

import { AppColors, Radius, Spacing } from "../../../styles";

import { SizeType } from "@/core/types";

export const ToastLinkStyle = (size: SizeType) =>
  StyleSheet.create({
    Container: {
      maxWidth: 100,
      backgroundColor: AppColors.neutral[0],
      borderRadius: Radius.radius_md,
      padding: size === "mobile" ? Spacing.spacing_xs : Spacing.spacing_sm,
      justifyContent: "center",
      alignItems: "center",
      elevation: 4,
    },
  });
