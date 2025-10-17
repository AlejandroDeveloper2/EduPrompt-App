import { SizeType } from "@/core/types";

import { Spacing } from "../../styles";

import { calculateGridElementWidth } from "../../helpers";

/**
 * Calcula los anchos de tres columnas dentro de un panel de indicadores
 * en función del tamaño de pantalla y el ancho total disponible.
 *
 * Esta función usa `calculateGridElementWidth` para determinar el ancho
 * de cada grupo de elementos del grid (primer, segundo y tercer bloque),
 * adaptando los valores según el tipo de dispositivo (`mobile`, `tablet`, `laptop`).
 *
 * @param {SizeType} size - Tamaño actual del dispositivo o vista.
 * Puede ser `"mobile"`, `"tablet"` o `"laptop"`.
 * @param {number} width - Ancho total disponible para el grid (en píxeles).
 *
 * @returns {{ firstWidth: number, secondWidth: number, thirdWidth: number }}
 * Objeto que contiene los anchos calculados para cada bloque del panel:
 * - `firstWidth`: ancho del primer grupo de elementos.
 * - `secondWidth`: ancho del segundo grupo de elementos.
 * - `thirdWidth`: ancho del tercer grupo de elementos.
 *
 * @example
 * // Ejemplo de uso:
 * const { firstWidth, secondWidth, thirdWidth } = getIndicatorPanelGrid("laptop", 1200);
 * console.log(firstWidth, secondWidth, thirdWidth);
 */
export const getIndicatorPanelGrid = (
  size: SizeType,
  width: number
): { firstWidth: number; secondWidth: number; thirdWidth: number } => {
  const firstWidth = calculateGridElementWidth(
    size,
    { mobile: 2, tablet: 2, laptop: 3 },
    Spacing.spacing_xs,
    size === "laptop" ? 190 : 48,
    width
  );
  const secondWidth = calculateGridElementWidth(
    size,
    { mobile: 2, tablet: 2, laptop: 2 },
    Spacing.spacing_xs,
    size === "laptop" ? 190 : 48,
    width
  );
  const thirdWidth = calculateGridElementWidth(
    size,
    { mobile: 1, tablet: 1, laptop: 2 },
    Spacing.spacing_xs,
    size === "laptop" ? 190 : 48,
    width
  );

  return { firstWidth, secondWidth, thirdWidth };
};
