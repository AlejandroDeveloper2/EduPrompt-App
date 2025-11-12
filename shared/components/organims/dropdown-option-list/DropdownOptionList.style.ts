import { StyleSheet } from "react-native";

import { AppColors, Radius, Spacing } from "../../../styles";

import { SizeType } from "@/core/types";

export const DropdownOptionListStyle = (size: SizeType) =>
  StyleSheet.create({
    ListContainer: {
      borderTopLeftRadius: Radius.radius_lg,
      borderTopRightRadius: Radius.radius_lg,
      width: "100%",
      gap: size === "mobile" ? Spacing.spacing_2xl : Spacing.spacing_3xl,
      backgroundColor: AppColors.basic.white,
    },
    ListContent: {
      width: "100%",
      display: "flex",
      gap: Spacing.spacing_null,
      justifyContent: "flex-start",
      flexGrow: 1,
    },
    PanelContainer: {
      width: "100%",
      backgroundColor: AppColors.neutral[0],
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: Spacing.spacing_md,
      paddingVertical: Spacing.spacing_sm,
    },
  });
