import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { Spacing } from "../../../styles";

export const dynamicStyles = (size: SizeType) =>
  StyleSheet.create({
    List: {
      width: "100%",
      flexWrap: "wrap",
      justifyContent: "center",
      alignContent: "center",
      display: "flex",
      flexDirection: "row",
      gap: size === "mobile" ? Spacing.spacing_xs : Spacing.spacing_sm,
    },
  });
