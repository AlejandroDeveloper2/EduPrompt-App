import { StyleSheet } from "react-native";

import { Spacing } from "@/shared/styles";

export const TagSelectionPanelStyle = StyleSheet.create({
  Container: {
    width: "100%",
    flexDirection: "column",
    gap: Spacing.spacing_xl,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.spacing_md,
  },
});
