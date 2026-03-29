import { StyleSheet } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

import { SizeType } from "@/core/types";
import { AppColors, Radius, Spacing } from "../../../styles";

export const PopUpStyle = (
  size: SizeType,
  insets: EdgeInsets,
  screenHeight: number,
) =>
  StyleSheet.create({
    // ── Background del sheet ──────────────────────────────────────────────────
    // Reemplaza tu PopUpWindow (backgroundStyle de BottomSheetModal)
    PopUpWindow: {
      width: size === "mobile" ? "100%" : size === "tablet" ? "80%" : "50%",
      backgroundColor: AppColors.basic.white,
      borderTopLeftRadius: Radius.radius_lg,
      borderTopRightRadius: Radius.radius_lg,
      borderBottomLeftRadius:
        size === "mobile" ? Radius.radius_null : Radius.radius_lg,
      borderBottomRightRadius:
        size === "mobile" ? Radius.radius_null : Radius.radius_lg,
      elevation: 3,
      shadowColor: "rgba(0,0,0,0.4)",
      shadowOffset: { width: 6, height: 6 },
    },

    // ── Contenedor del handle (drag indicator + título) ───────────────────────
    // BottomSheetModal usa handleComponent para esto — reemplaza el header manual
    HandleContainer: {
      width: "100%",
      alignItems: "center",
      paddingTop: Spacing.spacing_md,
      paddingHorizontal: Spacing.spacing_xl,
      paddingBottom: Spacing.spacing_md,
      gap: Spacing.spacing_md,
    },

    // ── Indicador de arrastre ─────────────────────────────────────────────────
    // Mismo que tu ClosePopUpDragIndicator original
    ClosePopUpDragIndicator: {
      width: size === "mobile" ? 180 : 220,
      height: 10,
      backgroundColor: AppColors.neutral[100],
      borderRadius: Radius.radius_pilled,
      alignSelf: "center",
    },

    // ── Contenedor del contenido ──────────────────────────────────────────────
    // Usado por BottomSheetScrollView (scrollable) y BottomSheetView (estático)
    PopUpContent: {
      width: "100%",
      flexGrow: 1,
      flexShrink: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      paddingHorizontal: Spacing.spacing_xl,
      paddingTop: Spacing.spacing_md,
      paddingBottom:
        size === "mobile"
          ? Spacing.spacing_md + insets.bottom
          : Spacing.spacing_xl + insets.bottom,
      gap: Spacing.spacing_md,
    },

    PopUpContentNested: {
      width: "100%",
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      paddingHorizontal: Spacing.spacing_xl,
      paddingTop: Spacing.spacing_md,
      paddingBottom:
        size === "mobile"
          ? Spacing.spacing_md + insets.bottom
          : Spacing.spacing_xl + insets.bottom,
      gap: Spacing.spacing_md,
    },
  });
