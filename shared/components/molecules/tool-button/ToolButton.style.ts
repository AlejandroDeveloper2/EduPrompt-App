import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { AppColors, Radius } from "../../../styles";

export const dynamicStyles = (size: SizeType) =>
  StyleSheet.create({
    OptionPressable: {
      width: size === "mobile" ? 36 : 45,
      height: size === "mobile" ? 36 : 45,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: Radius.radius_rounded,
      borderWidth: 1,
      borderColor: AppColors.neutral[25],
    },
  });
