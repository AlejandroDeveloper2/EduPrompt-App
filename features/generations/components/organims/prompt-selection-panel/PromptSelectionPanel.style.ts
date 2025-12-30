import { StyleSheet } from "react-native";

import { Spacing } from "@/shared/styles";

export const PromptSelectionPanelStyle = StyleSheet.create({
  Container: {
    width: "100%",
    flexDirection: "column",
    gap: Spacing.spacing_xl,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  FiltersContainer: {
    width: "100%",
    flexDirection: "column",
    gap: Spacing.spacing_xs,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  FilterList: {
    gap: Spacing.spacing_2xs,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: Spacing.spacing_xs,
  },
});
