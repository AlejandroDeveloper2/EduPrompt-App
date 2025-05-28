import { StyleSheet } from "react-native";

import { SizeType } from "@/lib/types";

import { Spacing } from "@/styles";

export const OnboardingDescriptionStyle = (size: SizeType) =>
  StyleSheet.create({
    StepContent: {
      width: "90%",
      justifyContent: "center",
      alignItems: "center",
      gap: size === "mobile" ? Spacing.spacing_md : Spacing.spacing_lg,
      flexDirection: size === "laptop" ? "row" : "column",
      display: "flex",
    },
    StepDescription: {
      width: "100%",
      display: "flex",
      gap: size === "mobile" ? Spacing.spacing_md : Spacing.spacing_lg,
      justifyContent: "center",
      alignItems: "center",
    },
    StepOptions: {
      flexDirection: size === "mobile" ? "column-reverse" : "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      gap: size === "mobile" ? Spacing.spacing_sm : Spacing.spacing_md,
    },
  });
