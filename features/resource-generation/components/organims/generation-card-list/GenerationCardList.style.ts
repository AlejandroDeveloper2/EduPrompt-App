import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { Spacing } from "@/shared/styles";

export const GenerationCardListStyle = (size: SizeType) =>
  StyleSheet.create({
    ListHeaderContainer: {
      height: "auto",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: Spacing.spacing_xl,
    },
    ListContainer: {
      width: "100%",
      gap: size === "mobile" ? Spacing.spacing_lg : Spacing.spacing_xl,
      paddingTop: Spacing.spacing_3xl,
    },
    ListContent: {
      width: "100%",
      display: "flex",
      gap: size === "mobile" ? Spacing.spacing_lg : Spacing.spacing_xl,
      paddingBottom: Spacing.spacing_4xl * 4.5,
      justifyContent: "flex-start",
    },
    EmptyContainer: {
      width: "100%",
      gap: Spacing.spacing_xs,
      justifyContent: "center",
      alignItems: "center",
    },
  });
