import { StyleSheet } from "react-native";

import { Spacing } from "@/shared/styles";

export const SubscriptionManagePanelStyle = StyleSheet.create({
  PanelContainer: {
    width: "100%",
    flexDirection: "column",
    gap: Spacing.spacing_xl,
    justifyContent: "center",
    alignItems: "center",
  },
  DetailsList: {
    width: "100%",
    gap: Spacing.spacing_md,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
