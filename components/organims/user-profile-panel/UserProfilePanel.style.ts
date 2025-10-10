import { StyleSheet } from "react-native";

import { AppColors, Spacing } from "@/styles";

import { SizeType } from "@/lib/types";

export const UserProfilePanelStyles = (size: SizeType) =>
  StyleSheet.create({
    PanelContainer: {
      width: "100%",
      flexDirection: "column",
      gap: Spacing.spacing_xl,
      justifyContent: "center",
      alignItems: "center",
    },
    AuthSection: {
      width: "100%",
      flexDirection: "column",
      gap: size === "mobile" ? Spacing.spacing_sm : Spacing.spacing_md,
      justifyContent: "center",
      alignItems: "center",
    },
    FormCard: {
      width: "100%",
      borderColor: AppColors.neutral[0],
      borderBottomWidth: 2,
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: Spacing.spacing_md,
    },
  });
