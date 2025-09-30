import { StyleSheet } from "react-native";

import { Spacing } from "@/styles";

export const LinkStyle = (alignment?: "left" | "center" | "right") =>
  StyleSheet.create({
    LinkContainer: {
      width: "100%",
      justifyContent: alignment
        ? alignment === "left"
          ? "flex-start"
          : alignment === "center"
          ? "center"
          : "flex-end"
        : "center",
      alignItems: "center",
      flexDirection: "row",
      gap: Spacing.spacing_xs,
    },
  });
