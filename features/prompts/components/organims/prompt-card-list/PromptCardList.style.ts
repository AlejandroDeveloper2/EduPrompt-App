import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { Spacing } from "@/shared/styles";

export const PromptCardListStyle = (size: SizeType) =>
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
    },
    ListContent: {
      width: "100%",
      display: "flex",
      gap: size === "mobile" ? Spacing.spacing_lg : Spacing.spacing_xl,
      justifyContent: "flex-start",
    },
    EmptyContainer: {
      width: "100%",
      gap: Spacing.spacing_xs,
      justifyContent: "center",
      alignItems: "center",
    },
    FiltersContainer: {
      width: "100%",
      height: "auto",
      flexDirection: "column",
      gap: Spacing.spacing_xs,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    FiltersRow: {
      gap: Spacing.spacing_2xs,
      justifyContent: "flex-start",
      alignItems: "center",
      paddingVertical: Spacing.spacing_xs,
    },
  });
