import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { Spacing } from "../../../styles";

export const dynamicStyles = (size: SizeType) =>
  StyleSheet.create({
    Container: {
      width: "100%",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: size === "laptop" ? "flex-start" : "center",
      gap: Spacing.spacing_md,
    },
  });
