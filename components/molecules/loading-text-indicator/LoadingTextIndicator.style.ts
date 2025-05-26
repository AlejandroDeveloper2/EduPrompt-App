import { StyleSheet } from "react-native";

import { Spacing } from "@/styles";

export const LoadingTextIndicatorStyle = StyleSheet.create({
  Container: {
    flexDirection: "row",
    display: "flex",
    gap: Spacing.spacing_xs,
    justifyContent: "center",
    alignItems: "center",
  },
});
