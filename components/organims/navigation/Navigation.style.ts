import { StyleSheet } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

import { SizeType } from "@/lib/types";

import { AppColors, Radius, Spacing } from "@/styles";

export const NavigationStyle = (size: SizeType, insets: EdgeInsets) =>
  StyleSheet.create({
    NavigationContainer: {
      width: size === "laptop" ? "auto" : "100%",
      height: size === "laptop" ? "100%" : "auto",
      backgroundColor:
        size === "laptop" ? AppColors.basic.white : AppColors.neutral[0],
      display: "flex",
      flexDirection: size === "laptop" ? "column" : "row",
      justifyContent: "center",
      alignItems: "center",
      gap: Spacing.spacing_md,
      borderTopRightRadius:
        size === "laptop" ? Radius.radius_null : Radius.radius_lg,
      borderTopLeftRadius:
        size === "laptop" ? Radius.radius_null : Radius.radius_lg,
      // elevation: 10,
      // shadowOpacity: 0.6,
      // shadowOffset: { width: 0, height: 6 },

      overflow: "hidden",
      borderLeftWidth: size === "laptop" ? 1 : 0,
      borderLeftColor: AppColors.neutral[25],
      paddingHorizontal:
        size === "laptop" ? Spacing.spacing_xl : Spacing.spacing_4xl,
      paddingTop: size === "mobile" ? Spacing.spacing_xs : Spacing.spacing_sm,
      paddingBottom:
        size === "mobile"
          ? insets.bottom + Spacing.spacing_xs
          : insets.bottom + Spacing.spacing_sm,
      position: size === "laptop" ? "relative" : "absolute",
      bottom: 0,
      left: 0,
      right: 0,
    },
    NavSlice: {
      display: "flex",
      flexDirection: size === "laptop" ? "column" : "row",
      gap: Spacing.spacing_xs,
      justifyContent: "center",
      alignItems: "center",
    },
  });
