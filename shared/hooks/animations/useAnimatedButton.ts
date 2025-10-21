import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { ButtonVariantType } from "@/core/types";

import { getButtonBackground, getButtonPressedBackground } from "../../helpers";

/**
 * Hook personalizado para manejar la animación del color de fondo de un botón
 * cuando el usuario lo presiona o suelta.
 *
 * Utiliza `react-native-reanimated` para interpolar de forma fluida
 * entre el color por defecto y el color del estado presionado.
 *
 * @param {ButtonVariantType} variant - Variante visual del botón (por ejemplo: `"primary"`, `"secondary"`, `"outline"`, etc.).
 * @param {boolean} [disabled=false] - Indica si el botón está deshabilitado. Afecta los colores de fondo y de interacción.
 *
 * @returns {{
 *   animatedBackground: AnimatedStyleProp<ViewStyle>;
 *   onPressIn: () => void;
 *   onPressOut: () => void;
 * }}
 * Un objeto con las siguientes propiedades:
 * - `animatedBackground`: estilo animado que se puede aplicar directamente al contenedor del botón.
 * - `onPressIn`: función que debe llamarse al iniciar la presión (por ejemplo, en `onPressIn` de un `Pressable`).
 * - `onPressOut`: función que debe llamarse al liberar la presión (por ejemplo, en `onPressOut` de un `Pressable`).
 *
 * @example
 * import { Pressable, Animated } from "react-native";
 * import useAnimatedButton from "@/hooks/useAnimatedButton";
 *
 * const MyButton = () => {
 *   const { animatedBackground, onPressIn, onPressOut } = useAnimatedButton("primary");
 *
 *   return (
 *     <Animated.View style={[styles.button, animatedBackground]}>
 *       <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
 *         <Text style={styles.label}>Presionar</Text>
 *       </Pressable>
 *     </Animated.View>
 *   );
 * };
 */
const useAnimatedButton = (
  variant: ButtonVariantType,
  disabled?: boolean
): {
  animatedBackground: { backgroundColor: string };
  onPressIn: () => void;
  onPressOut: () => void;
} => {
  const defaultBG = getButtonBackground(variant, disabled);
  const pressedBG = getButtonPressedBackground(variant, disabled);

  const background = useSharedValue(0);

  const onPressIn = (): void => {
    background.value = withTiming(1, { duration: 300 });
  };

  const onPressOut = (): void => {
    background.value = withTiming(0, { duration: 300 });
  };

  const animatedBackground = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      background.value,
      [0, 1],
      [defaultBG, pressedBG]
    ),
  }));

  return {
    animatedBackground,
    onPressIn,
    onPressOut,
  };
};

export default useAnimatedButton;
