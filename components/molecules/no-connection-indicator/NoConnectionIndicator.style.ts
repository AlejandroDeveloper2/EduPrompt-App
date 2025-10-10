import { StyleSheet } from "react-native";

import { SizeType } from "@/lib/types";

import { Spacing } from "@/styles";

export const NoConnectionIndicatorStyle = (size: SizeType) =>
  StyleSheet.create({
    Container: {
      width: "auto",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: size === "mobile" ? Spacing.spacing_sm : Spacing.spacing_md,
    },
  });
