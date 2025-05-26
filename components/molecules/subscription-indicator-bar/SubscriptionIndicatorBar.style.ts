import { StyleSheet } from "react-native";

import { SizeType } from "@/lib/types";

import { Spacing } from "@/styles";

export const SubscriptionIndicatorBarStyle = (size: SizeType) =>
  StyleSheet.create({
    BarContainer: {
      width: "100%",
      height: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical:
        size === "mobile" ? Spacing.spacing_sm : Spacing.spacing_md,
    },
    Content: {
      width: size === "laptop" ? "100%" : "90%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal:
        size === "laptop" ? Spacing.spacing_xl : Spacing.spacing_null,
    },
    LabelContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: Spacing.spacing_2xs,
    },
  });
