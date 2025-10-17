import { ButtonVariantType } from "@/core/types";

import { AppColors } from "@/shared/styles";

/**
 * Devuelve el color de fondo para un botón según su variante y estado de deshabilitado.
 *
 * @param variant - La variante de estilo visual del botón
 * @param disabled - Bandera opcional que indica si el botón está deshabilitado
 * @returns El valor del color de AppColors correspondiente al estado del botón
 *
 * @example
 * ```typescript
 * const bgColor = getButtonBackground('primary', false);
 * // Retorna AppColors.primary[500]
 * ```
 */
export const getButtonBackground = (
  variant: ButtonVariantType,
  disabled?: boolean
) => {
  const bg = disabled ? AppColors.neutral[50] : AppColors.basic.white;

  return variant === "neutral" ? bg : AppColors[variant][disabled ? 100 : 400];
};

/**
 * Devuelve el color de fondo para un botón presionado según su variante y estado de deshabilitado.
 *
 * @param variant - La variante de estilo visual del botón
 * @param disabled - Bandera opcional que indica si el botón está deshabilitado
 * @returns El valor del color de AppColors correspondiente al estado del botón
 *
 * @example
 * ```typescript
 * const bgColor = getButtonPressedBackground('primary', false);
 * // Retorna AppColors.primary[500]
 * ```
 */
export const getButtonPressedBackground = (
  variant: ButtonVariantType,
  disabled?: boolean
) => {
  const colorScale = disabled
    ? variant === "neutral"
      ? 50
      : 100
    : variant === "neutral"
    ? 25
    : 500;

  return AppColors[variant][colorScale];
};
