import { StyleSheet } from "react-native";

import { AppColors } from "./AppColors";
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
    width: "90%",
    justifyContent: "flex-start",
    paddingBottom: Spacing.spacing_4xl * 4.5,
    gap: Spacing.spacing_xl,
    paddingTop: Spacing.spacing_3xl,
  },
  SvgIllustration: {
    transform: [{ scale: 0.8 }],
  },
});
