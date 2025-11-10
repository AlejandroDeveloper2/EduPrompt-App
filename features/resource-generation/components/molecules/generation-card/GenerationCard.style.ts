import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";
import { AppColors, Radius, Spacing } from "@/shared/styles";

export const GenerationCardStyle = (size: SizeType) =>
  StyleSheet.create({
    CardContainer: {
      width: "100%",
      height: "auto",
      backgroundColor: AppColors.basic.white,
      borderRadius: Radius.radius_lg,
      borderColor: AppColors.neutral[50],
      borderWidth: 1,
      borderStyle: "solid",
      flexDirection: "column",
      gap: Spacing.spacing_sm,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal:
        size === "laptop" ? Spacing.spacing_md : Spacing.spacing_sm,
      paddingVertical:
        size === "laptop" ? Spacing.spacing_lg : Spacing.spacing_md,
    },
    CardHeader: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    CardActions: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: Spacing.spacing_sm,
    },
    CardBody: {
      width: "100%",
      flexDirection: "column",
      gap: size === "laptop" ? Spacing.spacing_xs : Spacing.spacing_2xs,
      justifyContent: "center",
      alignItems: "flex-start",
    },
    CardCurrentStepTitle: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: Spacing.spacing_xs,
    },
  });
