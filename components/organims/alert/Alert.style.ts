import { StyleSheet } from "react-native";

import { SizeType } from "@/lib/types";

import { Spacing } from "@/styles";

export const AlertStyle = (size: SizeType) =>
  StyleSheet.create({
    AlertContainer: {
      width: "100%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: size === "mobile" ? Spacing.spacing_md : Spacing.spacing_lg,
    },
    Options: {
      width: "100%",
      flexDirection: size === "mobile" ? "column" : "row",
      justifyContent: "center",
      alignItems: "center",
      gap: Spacing.spacing_xs,
    },
  });
