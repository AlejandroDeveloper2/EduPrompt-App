import { StyleSheet } from "react-native";

import { Spacing } from "../../../styles";

export const PromptInputStyle = StyleSheet.create({
  OptionList: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: Spacing.spacing_xs,
  },
});
