import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { AppColors, Spacing } from "../../../styles";

export const DropdownOptionStyle = (size: SizeType) =>
  StyleSheet.create({
    OptionBox: {
      width: "100%",
      height: "auto",
      padding: size === "mobile" ? Spacing.spacing_md : Spacing.spacing_lg,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderColor: AppColors.neutral[0],
      borderStyle: "solid",
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
    },
  });
