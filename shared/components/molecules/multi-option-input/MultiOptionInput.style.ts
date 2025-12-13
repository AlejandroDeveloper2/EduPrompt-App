import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";
import { AppColors, Radius, Spacing } from "@/shared/styles";

export const MultiOptionInputStyle = (size: SizeType) =>
  StyleSheet.create({
    InputContainer: {
      width: "100%",
      height: "auto",
      gap: Spacing.spacing_xs,
      justifyContent: "flex-start",
      alignItems: "center",
      flexDirection: "column",
    },
    OptionsGrid: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      display: "flex",
      gap: size === "mobile" ? Spacing.spacing_xs : Spacing.spacing_sm,
      justifyContent: "center",
      alignItems: "center",
    },
    OptionContainer: {
      height: "auto",
      borderRadius: Radius.radius_pilled,
      borderWidth: 1,
      borderColor: AppColors.neutral[50],
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: Spacing.spacing_xl,
      paddingVertical:
        size === "mobile" ? Spacing.spacing_sm : Spacing.spacing_md,
    },
  });
