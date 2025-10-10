import { StyleSheet } from "react-native";

import { SizeType } from "@/lib/types";

import { AppColors, Radius, Spacing } from "@/styles";

export const TabulatorStyle = (size: SizeType) =>
  StyleSheet.create({
    TabulatorContainer: {
      width: "100%",
      height: size === "mobile" ? 34 : 44,
      borderRadius: Radius.radius_pilled,
      flexDirection: "row",
      gap: Spacing.spacing_null,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: AppColors.basic.white,
      borderColor: AppColors.neutral[50],
      borderWidth: 1,
      flexShrink: 0,
      overflow: "hidden",
    },
    TabPressable: {
      flex: 1,
      display: "flex",
      height: "100%",
      // paddingHorizontal: Spacing.spacing_xl,
      // paddingVertical:
      //   size === "mobile" ? Spacing.spacing_xs : Spacing.spacing_sm,
      justifyContent: "center",
      alignItems: "center",
    },
  });
