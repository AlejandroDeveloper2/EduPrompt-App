import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { AppColors, Radius, Spacing } from "@/shared/styles";

export const NotificationCardStyle = (size: SizeType) =>
  StyleSheet.create({
    NotificationContainer: {
      width: "100%",
      height: "auto",
      flex: 1,
      backgroundColor: AppColors.basic.white,
      gap: Spacing.spacing_md,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingHorizontal:
        size === "mobile" ? Spacing.spacing_md : Spacing.spacing_lg,
      paddingVertical:
        size === "mobile" ? Spacing.spacing_lg : Spacing.spacing_xl,
      borderRadius: Radius.radius_lg,
      borderWidth: 1,
      borderColor: AppColors.neutral[50],
      borderStyle: "solid",
    },
    Header: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: Spacing.spacing_2xs,
    },
    TitleContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    Tools: {
      flexDirection: "row",
      gap: Spacing.spacing_3xs,
      justifyContent: "center",
      alignItems: "center",
    },
    LinksContainer: {
      width: "100%",
      flexDirection: "column",
      gap: Spacing.spacing_xs,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    LinkPressable: {
      width: "100%",
      height: "auto",
    },
  });
