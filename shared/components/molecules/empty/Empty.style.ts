import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { Spacing } from "../../../styles";

export const EmptyStyle = (size: SizeType) =>
  StyleSheet.create({
    Container: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: size === "mobile" ? Spacing.spacing_2xs : Spacing.spacing_xs,
      justifyContent: "center",
      alignItems: "center",
    },
  });
