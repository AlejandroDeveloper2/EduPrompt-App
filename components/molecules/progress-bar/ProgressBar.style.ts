import { StyleSheet } from "react-native";

import { Spacing } from "@/styles";

export const ProgressBarStyle = StyleSheet.create({
  Container: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    gap: Spacing.spacing_sm,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
