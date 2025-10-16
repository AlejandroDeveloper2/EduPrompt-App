import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { AppColors, Radius } from "../../../styles";

export const StepStyle = (active: boolean, size: SizeType) =>
  StyleSheet.create({
    PressableStep: {
      width: size === "mobile" ? 30 : 40,
      height: size === "mobile" ? 15 : 20,
      backgroundColor: active ? AppColors.primary[400] : AppColors.basic.white,
      borderRadius: Radius.radius_pilled,
      borderWidth: active ? 0 : 1,
      borderColor: AppColors.neutral[50],
      borderStyle: "solid",
    },
  });
