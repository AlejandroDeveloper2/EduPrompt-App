import { StyleSheet, ViewStyle } from "react-native";

import { SizeType } from "@/core/types";

import { Radius, Spacing } from "@/shared/styles";

const SharedStyle: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const PromptCardStyle = (size: SizeType) =>
  StyleSheet.create({
    CardContainer: {
      width: "100%",
      height: "auto",
      borderRadius: Radius.radius_lg,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: size === "mobile" ? Spacing.spacing_sm : Spacing.spacing_md,
      paddingHorizontal:
        size === "mobile" ? Spacing.spacing_md : Spacing.spacing_lg,
      paddingTop: size === "mobile" ? Spacing.spacing_sm : Spacing.spacing_md,
      paddingBottom:
        size === "mobile" ? Spacing.spacing_md : Spacing.spacing_xl,
      borderStyle: "solid",
    },
    CardHeader: SharedStyle,
    CardTags: {
      flexDirection: "row",
      display: "flex",
      gap: Spacing.spacing_2xs,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    CardContent: SharedStyle,
  });
