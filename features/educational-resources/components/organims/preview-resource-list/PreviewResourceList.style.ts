import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { Spacing } from "@/shared/styles";

export const PreviewResourceListStyle = (size: SizeType) =>
  StyleSheet.create({
    ListHeaderContainer: {
      width: "100%",
      flexDirection: "column",
      gap: Spacing.spacing_xl,
      alignItems: size === "laptop" ? "flex-start" : "center",
      justifyContent: "flex-start",
      display: "flex",
    },
    FilterSection: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: Spacing.spacing_xs,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    Filters: {
      display: "flex",
      justifyContent: "flex-start",
      gap: Spacing.spacing_2xs,
      paddingVertical: Spacing.spacing_xs,
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
    ViewPreviewContainer: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      gap: Spacing.spacing_xl,
    },
  });
