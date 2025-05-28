import { StyleSheet } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

import { SizeType } from "@/lib/types";

import { AppColors, Radius, Spacing } from "@/styles";

export const OnboardingTemplateStyle = (size: SizeType, insets: EdgeInsets) =>
  StyleSheet.create({
    Container: {
      width: "100%",
      backgroundColor: AppColors.primary[400],
      justifyContent: "flex-end",
      alignItems: "center",
      gap: Spacing.spacing_md,
      flex: 1,
      paddingBottom: insets.bottom,
    },
    StepContainerBox: {
      width: "100%",
      height: "85%",
      borderTopLeftRadius: Radius.radius_lg,
      borderTopRightRadius: Radius.radius_lg,
      flexDirection: "column",
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: AppColors.basic.white,
      paddingHorizontal: Spacing.spacing_lg,
      paddingVertical: Spacing.spacing_xl,
      gap: Spacing.spacing_4xl,
    },
  });
