import { StyleSheet } from "react-native";

import { SizeType } from "@/lib/types";

import { Spacing } from "@/styles";

export const EmptyStyle = (size: SizeType) =>
  StyleSheet.create({
    Container: {
      display: "flex",
      flexDirection: "column",
      gap: size === "mobile" ? Spacing.spacing_2xs : Spacing.spacing_xs,
      justifyContent: "center",
      alignItems: "center",
    },
  });
