import { StyleSheet } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

import { SizeType } from "@/lib/types";

import { AppColors, Spacing } from "@/styles";

export const HeaderStyle = (size: SizeType, insets: EdgeInsets) =>
  StyleSheet.create({
    HeaderContainer: {
      width: "100%",
      paddingTop:
        size === "mobile"
          ? insets.top + Spacing.spacing_xs
          : insets.top + Spacing.spacing_sm,
      gap: Spacing.spacing_null,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      display: "flex",
      backgroundColor: AppColors.basic.white,
    },
    NavItemListContainer: {
      width: size === "laptop" ? "100%" : "90%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal:
        size === "laptop" ? Spacing.spacing_xl : Spacing.spacing_null,
      paddingBottom:
        size === "mobile" ? Spacing.spacing_xs : Spacing.spacing_sm,
    },
    NavItems: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: size === "laptop" ? Spacing.spacing_md : Spacing.spacing_xs,
    },
  });
