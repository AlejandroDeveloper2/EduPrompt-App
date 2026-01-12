import { StyleSheet } from "react-native";

import { Spacing } from "@/shared/styles";

export const ProcessProgressStyle = StyleSheet.create({
  Container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: Spacing.spacing_xl,
  },
});
