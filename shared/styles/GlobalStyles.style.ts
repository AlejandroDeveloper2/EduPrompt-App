import { StyleSheet } from "react-native";

import { AppColors } from "./AppColors";
import { Radius } from "./Radius";
import { Spacing } from "./Spacing";

/** Estilos globales para contenedores principales e ilustraciones */
export const GlobalStyles = StyleSheet.create({
  RootContainer: {
    flex: 1,
    backgroundColor: AppColors.basic.white,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  PageContent: {
    justifyContent: "flex-start",
    paddingBottom: Spacing.spacing_4xl * 4.5,
    gap: Spacing.spacing_xl,
    paddingTop: Spacing.spacing_3xl,
  },
  PageDimensions: {
    width: "100%",
    paddingHorizontal: Spacing.spacing_xl,
  },
  SvgIllustration: {
    transform: [{ scale: 0.8 }],
  },
  FormCard: {
    width: "100%",
    height: "auto",
    backgroundColor: AppColors.basic.white,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radius.radius_lg,
    gap: Spacing.spacing_lg,
    paddingVertical: Spacing.spacing_xl,
    paddingHorizontal: Spacing.spacing_lg,
  },
  AuthContainer: {
    width: "100%",
    maxWidth: 744,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.spacing_md,
    flex: 1,
  },
  OpacityLayer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(16,185,129,0.8)",
  },
  ToastsQueueContainer: {
    width: "auto",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: Spacing.spacing_sm,
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 10000,
  },

  /** Botoom Sheet Modal styles  */
  SheetContent: {
    backgroundColor: AppColors.basic.white,
    gap: Spacing.spacing_md,
    paddingHorizontal: Spacing.spacing_xl,
    paddingTop: Spacing.spacing_md,
    alignItems: "center",
  },
  ClosePopUpDragIndicator: {
    width: 180,
    height: 10,
    backgroundColor: AppColors.neutral[100],
    borderRadius: Radius.radius_pilled,
    alignSelf: "center",
  },
  SheetHeaderContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: Spacing.spacing_md,
    paddingHorizontal: Spacing.spacing_xl,
    paddingBottom: Spacing.spacing_md,
    gap: Spacing.spacing_md,
  },
});
