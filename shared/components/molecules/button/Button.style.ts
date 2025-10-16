import { StyleSheet } from "react-native";

import { ButtonWidthType, SizeType } from "@/core/types";

import { Radius, Spacing } from "../../../styles";

interface StyleProps {
  width: ButtonWidthType;
  size: SizeType;
  flex?: number;
}

export const ButtonStyle = ({ width, size }: StyleProps) =>
  StyleSheet.create({
    Button: {
      width,
      height: "auto",
      display: "flex",
      flexDirection: "row",
      gap: Spacing.spacing_xs,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: Radius.radius_pilled,
      elevation: 3,
      shadowColor: "rgba(0,0,0,0.6)",
      shadowOffset: { width: 6, height: 6 },
      overflow: "hidden",
      paddingHorizontal:
        size === "mobile" ? Spacing.spacing_lg : Spacing.spacing_xl,
      paddingVertical:
        size === "mobile" ? Spacing.spacing_md : Spacing.spacing_lg,
    },
  });
