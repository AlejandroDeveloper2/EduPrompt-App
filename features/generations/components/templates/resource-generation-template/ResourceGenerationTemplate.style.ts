import { StyleSheet } from "react-native";

import { Spacing } from "@/shared/styles";

export const ResourceGenerationTemplateStyles = StyleSheet.create({
  StepContainer: {
    display: "flex",
    flexDirection: "column",
    gap: Spacing.spacing_md,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
