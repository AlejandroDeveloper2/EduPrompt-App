import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { AppColors, Radius, Spacing } from "../../../styles";

export const LoaderBarStyle = (size: SizeType) =>
  StyleSheet.create({
    BarTrack: {
      width: "100%",
      flex: 5,
      height: "auto",
      backgroundColor: AppColors.basic.white,
      borderColor: AppColors.neutral[50],
      borderWidth: 1,
      borderStyle: "solid",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignContent: "center",
      overflow: "hidden",
      borderRadius: Radius.radius_pilled,
      padding: size === "mobile" ? Spacing.spacing_3xs : Spacing.spacing_2xs,
    },

    BarProgressIndicator: {
      width: "30%",
      height: size === "mobile" ? 20 : 25,
      borderRadius: Radius.radius_pilled,
      backgroundColor: AppColors.primary[400],
    },
  });
