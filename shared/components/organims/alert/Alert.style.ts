import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { AppColors, Radius, Spacing } from "../../../styles";

export const dynamicStyles = (size: SizeType) =>
  StyleSheet.create({
    CenteredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    AlertContainer: {
      width: "80%",
      maxWidth: 300,
      padding: Spacing.spacing_lg,
      borderRadius: Radius.radius_lg,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: size === "mobile" ? Spacing.spacing_md : Spacing.spacing_lg,
      backgroundColor: AppColors.basic.white,
    },
    Options: {
      width: "100%",
      flexDirection: size === "mobile" ? "column" : "row",
      justifyContent: "center",
      alignItems: "center",
      gap: Spacing.spacing_xs,
    },
  });
