import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { Radius, Spacing } from "../../../styles";

export const SpinnerStyle = (size: SizeType, color: string) =>
  StyleSheet.create({
    Box: {
      width: "auto",
      display: "flex",
      flexDirection: "column",
      gap: Spacing.spacing_4xs,
      justifyContent: "center",
      alignItems: "center",
    },
    Row: {
      width: "auto",
      display: "flex",
      flexDirection: "row",
      gap: Spacing.spacing_3xs,
      justifyContent: "center",
      alignItems: "center",
    },
    Circle: {
      width: size === "mobile" ? 8 : 10,
      height: size === "mobile" ? 8 : 10,
      borderRadius: Radius.radius_rounded,
      backgroundColor: color,
    },
  });
