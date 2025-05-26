import { StyleSheet } from "react-native";

import { Spacing } from "@/styles";

export const StepperStyle = StyleSheet.create({
  StepList: {
    width: "auto",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: Spacing.spacing_xs,
  },
});
