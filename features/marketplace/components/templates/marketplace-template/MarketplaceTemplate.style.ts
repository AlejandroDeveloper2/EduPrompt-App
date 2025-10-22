import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";

import { Spacing } from "@/shared/styles";

export const MarketplaceTemplateStyle = (size: SizeType) =>
  StyleSheet.create({
    PackageList: {
      justifyContent: "flex-start",
      alignItems: "center",
      gap: size === "laptop" ? Spacing.spacing_lg : Spacing.spacing_sm,
      paddingVertical: Spacing.spacing_xs,
      paddingHorizontal: Spacing.spacing_xs,
    },
  });
