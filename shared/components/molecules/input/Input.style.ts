import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { AppColors, FontSizes, Radius, Spacing } from "../../../styles";

import { getFontFamily } from "../../../helpers";

export const BaseInputStyle = (
  size: SizeType,
  disabled?: boolean,
  textArea?: boolean
) =>
  StyleSheet.create({
    Container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: Spacing.spacing_xs,
    },
    InputBox: {
      width: "100%",
      height: textArea ? 200 : "auto",
      display: "flex",
      flexDirection: "column",
      // gap: Spacing.spacing_sm,
      alignItems: "flex-start",
      justifyContent: "space-between",
      backgroundColor: disabled ? AppColors.neutral[0] : AppColors.basic.white,
      borderRadius: textArea ? Radius.radius_lg : Radius.radius_pilled,
      paddingHorizontal:
        size === "mobile" ? Spacing.spacing_lg : Spacing.spacing_xl,
      paddingBottom: textArea ? Spacing.spacing_md : Spacing.spacing_null,
    },
  });

export const InputStyle = (size: SizeType) =>
  StyleSheet.create({
    Body: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      height: "auto",
      width: "100%",
      overflow: "hidden",
    },
    Tools: {
      display: "flex",
      width: "100%",
      flex: 0.5,
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: Spacing.spacing_4xs,
      paddingVertical:
        size === "mobile" ? Spacing.spacing_md : Spacing.spacing_lg,
    },
    Input: {
      width: "100%",
      flex: 2.5,
      fontFamily: getFontFamily("regular"),
      fontSize: FontSizes[size]["paragraph"],
      fontStyle: "normal",
      textDecorationLine: "none",
      color: AppColors.neutral[1000],
      paddingVertical:
        size === "mobile" ? Spacing.spacing_md : Spacing.spacing_lg,
    },
  });
