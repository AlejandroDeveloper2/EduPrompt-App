import { StyleSheet } from "react-native";

import { ToastVariantType } from "@/core/types";

import { AppColors, Radius } from "../../../styles";

export const ToastLoadBarStyle = (variant: ToastVariantType) =>
  StyleSheet.create({
    LoadIndicator: {
      height: 8,
      borderTopRightRadius: Radius.radius_pilled,
      borderBottomRightRadius: Radius.radius_pilled,
      backgroundColor:
        variant === "neutral" ? AppColors.neutral[900] : AppColors.basic.white,
      position: "absolute",
      bottom: 0,
      left: 0,
    },
  });
