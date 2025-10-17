import { ButtonVariantType } from "@/core/types";

import { AppColors } from "../styles";

/**
 * Obtiene el color del texto (label) de un botón según su variante y estado de deshabilitación.
 *
 * @param {ButtonVariantType} variant - Variante del botón (por ejemplo: `"primary"`, `"secondary"`, `"neutral"`, etc.).
 * @param {boolean} [disabled=false] - Indica si el botón está deshabilitado. Si es `true`, se usará un color neutral.
 * @returns {string} Color correspondiente al texto del botón.
 *
 * @example
 * // Retorna un gris si el botón está deshabilitado
 * getButtonColorLabel("primary", true);
 *
 * @example
 * // Retorna el color de texto para un botón neutral
 * getButtonColorLabel("neutral");
 *
 * @example
 * // Retorna blanco para un botón activo que no es neutral
 * getButtonColorLabel("primary");
 */
export const getButtonColorLabel = (
  variant: ButtonVariantType,
  disabled?: boolean
): string => {
  return disabled
    ? AppColors.neutral[500]
    : variant === "neutral"
    ? AppColors.neutral[1000]
    : AppColors.basic.white;
};
