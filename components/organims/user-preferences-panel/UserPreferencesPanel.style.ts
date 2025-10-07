import { StyleSheet } from "react-native";

import { Spacing } from "@/styles";

export const UserPreferencesPanelStyles = StyleSheet.create({
  PanelContainer: {
    width: "100%",
    flexDirection: "column",
    gap: Spacing.spacing_xl,
    justifyContent: "center",
    alignItems: "center",
  },
  OptionsList: {
    width: "100%",
    flexDirection: "column",
    gap: Spacing.spacing_md,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
