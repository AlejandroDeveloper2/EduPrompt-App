import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";
import { Spacing } from "@/shared/styles";

export const FloatMenuItemStyle = (size: SizeType) =>
  StyleSheet.create({
    ItemContainer: {
      width: "100%",
      height: "auto",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: Spacing.spacing_2xs,
      padding: size === "mobile" ? Spacing.spacing_md : Spacing.spacing_lg,
    },
  });
