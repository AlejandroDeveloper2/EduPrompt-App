import { StyleSheet } from "react-native";

import { SizeType } from "@/lib/types";

import { Spacing } from "@/styles";

export const DashboardIndicatorPanelStyle = (size: SizeType) =>
  StyleSheet.create({
    PanelContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: size === "mobile" ? Spacing.spacing_xs : Spacing.spacing_sm,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      overflow: "hidden",
    },
    IndicatorsGrid: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      display: "flex",
      gap: size === "mobile" ? Spacing.spacing_xs : Spacing.spacing_sm,
      justifyContent: "center",
      alignItems: "center",
    },
  });
