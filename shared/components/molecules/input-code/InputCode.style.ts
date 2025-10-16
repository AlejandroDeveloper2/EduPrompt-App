import { StyleSheet } from "react-native";

import { getFontFamily } from "../../../helpers";

import { SizeType } from "@/core/types";

import { AppColors, FontSizes, Radius, Spacing } from "../../../styles";

export const InputCodeStyle = (size: SizeType, disabled?: boolean) =>
  StyleSheet.create({
    Container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: Spacing.spacing_xs,
    },
    InputBoxList: {
      flexDirection: "row",
      width: "100%",
      gap: Spacing.spacing_2xs,
      justifyContent: "center",
      alignItems: "center",
    },
    CodeInputField: {
      width: "auto",
      height: "auto",
      flex: 1,
      borderRadius: Radius.radius_lg,
      fontFamily: getFontFamily("regular"),
      fontSize: FontSizes[size]["paragraph"],
      fontStyle: "normal",
      textAlign: "center",
      textDecorationLine: "none",
      color: AppColors.neutral[1000],
      justifyContent: "center",
      alignItems: "center",
      paddingVertical:
        size === "mobile" ? Spacing.spacing_md : Spacing.spacing_lg,
      paddingHorizontal:
        size === "mobile" ? Spacing.spacing_lg : Spacing.spacing_xl,
      backgroundColor: disabled ? AppColors.neutral[0] : AppColors.basic.white,
    },
  });
