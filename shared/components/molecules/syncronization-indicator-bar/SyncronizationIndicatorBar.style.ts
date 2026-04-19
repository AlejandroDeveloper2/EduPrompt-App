import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { AppColors, Radius, Spacing } from "../../../styles";

export const styles = StyleSheet.create({
  BarContainer: {
    width: "100%",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: AppColors.neutral[0],
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  Content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  SyncPressable: {
    width: "auto",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.basic.white,
    borderColor: AppColors.neutral[25],
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: Radius.radius_pilled,
  },
});

export const dynamicStyles = (size: SizeType) =>
  StyleSheet.create({
    BarContainer: {
      paddingVertical:
        size === "mobile" ? Spacing.spacing_sm : Spacing.spacing_md,
    },
    Content: {
      width: size === "laptop" ? "100%" : "90%",
      paddingHorizontal:
        size === "laptop" ? Spacing.spacing_xl : Spacing.spacing_null,
    },
    SyncPressable: {
      paddingVertical:
        size === "laptop" ? Spacing.spacing_xs : Spacing.spacing_2xs,
      paddingHorizontal:
        size === "laptop" ? Spacing.spacing_md : Spacing.spacing_sm,
    },
  });
