import { StyleSheet } from "react-native";

import { Spacing } from "@/shared/styles";

export const TermsAndPoliciesStyle = StyleSheet.create({
  TextContainer: {
    width: "100%",
    gap: Spacing.spacing_sm,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  Body: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: Spacing.spacing_xs,
  },
});
