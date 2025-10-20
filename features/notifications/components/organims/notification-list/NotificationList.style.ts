import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { Spacing } from "@/shared/styles";

export const NotificationListStyle = (size: SizeType) =>
  StyleSheet.create({
    ListHeaderContainer: {
      height: "auto",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: Spacing.spacing_xl,
    },
    FiltersContainer: {
      width: "100%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      gap: Spacing.spacing_xs,
    },
    Filters: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: Spacing.spacing_2xs,
    },
    ListContainer: {
      width: "90%",
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
  });
