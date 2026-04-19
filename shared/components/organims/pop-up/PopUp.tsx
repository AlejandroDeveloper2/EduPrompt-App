import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ReactNode, useCallback, useEffect, useMemo, useRef } from "react";
import { View, ViewStyle, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useScreenDimensionsStore } from "../../../hooks/store";

import { Typography } from "../../atoms";

import { AppColors } from "../../../styles";

import { dynamicStyles } from "./PopUp.style";

export interface PopUpProps {
  /** Título mostrado en el header del popup */
  title: string;
  /** Icono de Ionicons junto al título */
  icon: keyof typeof Ionicons.glyphMap;
  /** Controla si el popup está visible */
  isOpen: boolean;

  /**
   * Activa BottomSheetScrollView interno.
   * Úsalo cuando el contenido es un formulario o lista larga.
   * @default false
   */
  scrollable?: boolean;
  /** Estilos extra para el contenedor del contenido */
  style?: ViewStyle;
  /** Callback al cerrar el popup (por gesto o backdrop) */
  onClose: () => void;
  children: ReactNode | ReactNode[];
}

const PopUp = ({
  title,
  icon,
  isOpen,
  scrollable = false,
  style,
  onClose,
  children,
}: PopUpProps) => {
  const ref = useRef<BottomSheetModal>(null);
  const size = useScreenDimensionsStore();
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();

  const styles = useMemo(
    () => dynamicStyles(size, insets, screenHeight),
    [size, insets, screenHeight],
  );

  useEffect(() => {
    if (isOpen) {
      ref.current?.present();
    } else {
      ref.current?.dismiss();
    }
  }, [isOpen]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.3}
        pressBehavior="close"
      />
    ),
    [],
  );

  const renderHandle = useCallback(
    () => (
      <View style={styles.HandleContainer}>
        <View style={styles.ClosePopUpDragIndicator} />
        <Typography
          text={title}
          weight="medium"
          type="h2"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="100%"
          icon={icon}
        />
      </View>
    ),
    [title, icon, styles],
  );

  return (
    <BottomSheetModal
      ref={ref}
      // enableDynamicSizing
      snapPoints={["50%", "95%"]}
      // ── Gestos ───────────────────────────────────────────────────────────────
      enablePanDownToClose // Reemplaza tu PanGesture manual
      // ── Teclado ──────────────────────────────────────────────────────────────
      keyboardBehavior="extend" // Sheet sube con el teclado
      keyboardBlurBehavior="restore" // Restaura snap al cerrar teclado
      android_keyboardInputMode="adjustPan"
      // ── Estilos ──────────────────────────────────────────────────────────────
      backgroundStyle={styles.PopUpWindow}
      handleComponent={renderHandle}
      backdropComponent={renderBackdrop}
      // ── Callbacks ────────────────────────────────────────────────────────────
      onDismiss={onClose}
    >
      {scrollable === true ? (
        <BottomSheetScrollView
          contentContainerStyle={[styles.PopUpContent, style]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {children}
        </BottomSheetScrollView>
      ) : (
        <BottomSheetView style={[styles.PopUpContentNested, style]}>
          {children}
        </BottomSheetView>
      )}
    </BottomSheetModal>
  );
};

export default PopUp;
