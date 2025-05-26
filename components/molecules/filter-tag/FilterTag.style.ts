import { StyleSheet } from "react-native";

import { SizeType } from "@/lib/types";

import { Radius, Spacing } from "@/styles";

export const FilterTagStyle = (size: SizeType) =>
  StyleSheet.create({
    PressableBox: {
      width: "auto",
      height: "auto",
      borderRadius: Radius.radius_pilled,
      flexDirection: "row",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: Spacing.spacing_2xs,
      paddingHorizontal:
        size === "mobile" ? Spacing.spacing_sm : Spacing.spacing_md,
    },
  });
