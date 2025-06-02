import { StyleSheet } from "react-native";

import { Spacing } from "@/styles";

export const BackgroundProcessPanelStyle = StyleSheet.create({
  Container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: Spacing.spacing_sm,
  },

  Header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: Spacing.spacing_2xs,
  },
});
