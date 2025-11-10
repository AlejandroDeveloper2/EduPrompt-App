import { StyleSheet } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

import { SizeType } from "@/core/types";

import { AppColors, Radius, Spacing } from "../../../styles";

export const PopUpStyle = (size: SizeType, insets: EdgeInsets) =>
  StyleSheet.create({
    Overlay: {
      width: "100%",
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.3)",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingBottom:
        size === "mobile" ? Spacing.spacing_null : Spacing.spacing_2xl,
    },
    PopUpWindow: {
      width: size === "mobile" ? "100%" : size === "tablet" ? "80%" : "50%",
      minHeight: 250,
      // maxHeight: 550,
      backgroundColor: AppColors.basic.white,
      borderTopLeftRadius: Radius.radius_lg,
      borderTopRightRadius: Radius.radius_lg,
      borderBottomLeftRadius:
        size === "mobile" ? Radius.radius_null : Radius.radius_lg,
      borderBottomRightRadius:
        size === "mobile" ? Radius.radius_null : Radius.radius_lg,
      display: "flex",
      position: "relative",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: Spacing.spacing_md,
      overflow: "hidden",
      paddingHorizontal: Spacing.spacing_xl,
      paddingTop: Spacing.spacing_md + 20,
      paddingBottom:
        size === "mobile"
          ? Spacing.spacing_md + insets.bottom
          : Spacing.spacing_xl + insets.bottom,
      elevation: 3,
      shadowColor: "rgba(0,0,0,0.4)",
      shadowOffset: { width: 6, height: 6 },
    },
    PopUpContent: {
      width: "100%",
      height: "auto",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    ClosePopUpDragIndicator: {
      width: size === "mobile" ? 180 : 220,
      height: 10,
      backgroundColor: AppColors.neutral[100],
      borderRadius: Radius.radius_pilled,
      position: "absolute",
      top: 10,
      alignSelf: "center",
      marginHorizontal: "auto",
    },
  });
