import { StyleSheet } from "react-native";

import {
  AlignTextType,
  FontSizeType,
  FontWeigthType,
  TypographyType,
} from "@/lib/types";

import { FontSizes, Spacing } from "@/styles";

import { getFontFamily } from "@/lib/helpers";

interface StyleProps {
  weight: FontWeigthType;
  color: string;
  textAlign: AlignTextType;
  size: FontSizeType;
  type: TypographyType;
  width: "auto" | "100%";
}

export const TypographyStyle = ({
  weight,
  color,
  textAlign,
  size,
  type,
  width,
}: StyleProps) =>
  StyleSheet.create({
    TextContainer: {
      width,
      height: "auto",
      display: "flex",
      gap: Spacing.spacing_2xs,
      alignItems: "center",
      justifyContent:
        textAlign === "left"
          ? "flex-start"
          : textAlign === "right"
          ? "flex-end"
          : "center",
      flexDirection: "row",
    },
    Text: {
      color,
      fontSize: FontSizes[size][type],
      fontStyle: "normal",
      textDecorationLine: "none",
      textAlign: textAlign,
      fontFamily: getFontFamily(weight),
    },
  });
