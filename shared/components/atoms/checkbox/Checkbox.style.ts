import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { AppColors, Radius } from "../../../styles";

export const CheckboxStyle = (
  size: SizeType,
  checked: boolean,
  disabled?: boolean
) =>
  StyleSheet.create({
    checkbox: {
      width: size === "mobile" ? 24 : 32,
      height: size === "mobile" ? 24 : 32,
      borderRadius: Radius.radius_sm,
      borderWidth: 1,
      borderColor: AppColors.neutral[50],
      borderStyle: "solid",
      backgroundColor:
        disabled === true
          ? AppColors.neutral[100]
          : checked
          ? AppColors.neutral[25]
          : AppColors.basic.white,
      justifyContent: "center",
      alignContent: "center",
      display: "flex",
    },
  });
