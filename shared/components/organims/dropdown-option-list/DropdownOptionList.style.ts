import { Dimensions, StyleSheet } from "react-native";

import { AppColors, Radius, Spacing } from "../../../styles";

import { SizeType } from "@/core/types";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export const DropdownOptionListStyle = (size: SizeType) =>
  StyleSheet.create({
    ListContainer: {
      borderTopLeftRadius: Radius.radius_lg,
      borderTopRightRadius: Radius.radius_lg,
      width: "100%",
      backgroundColor: AppColors.basic.white,
      maxHeight: SCREEN_HEIGHT * 0.8,
    },
    ListContent: {
      width: "100%",
      display: "flex",
      gap: Spacing.spacing_null,
      justifyContent: "flex-start",
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
