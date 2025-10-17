import { DimensionValue } from "react-native";

import { SizeType } from "@/core/types";

type NumColsConfig = {
  mobile: number;
  tablet: number;
  laptop: number;
};

/**
 * Calcula el ancho de un único elemento de la cuadrícula basado en la configuración de diseño y el ancho disponible de la ventana.
 *
 * Esta función:
 * - Obtiene el número de columnas para el `size` dado desde `colsConfig`.
 * - Calcula el espacio total de separación horizontal entre columnas como `containerGap * (numCols - 1)`.
 * - Resta la separación total y el padding horizontal del contenedor (`containerVerticalPadding`) de `windowWidth`.
 * - Divide el ancho disponible restante de forma uniforme entre `numCols`.
 *
 * @param size - La clave de tamaño usada para seleccionar el número de columnas de `colsConfig`.
 * @param colsConfig - Mapeo de claves de tamaño al número de columnas para ese tamaño.
 * @param containerGap - Separación horizontal (espacio) entre elementos adyacentes de la cuadrícula (esperado en las mismas unidades que `windowWidth`, p. ej. píxeles).
 * @param containerVerticalPadding - Padding total del contenedor (suma de padding izquierdo + derecho). Aunque se nombra "vertical", este valor se trata como padding horizontal en el cálculo.
 * @param windowWidth - Ancho total disponible para el contenedor (en las mismas unidades que `containerGap` y el valor devuelto).
 * @returns El ancho calculado de un solo elemento de la cuadrícula (mismas unidades que `windowWidth`). El valor puede ser fraccionario.
 *
 * @remarks
 * - La función asume que `colsConfig[size]` devuelve un entero positivo de columnas. Si `numCols` es 0 o negativo, el resultado será `NaN` o `Infinity`.
 * - Valores negativos para `containerGap` o `containerVerticalPadding` afectarán el ancho devuelto; si es necesario, valide las entradas.
 *
 * @example
 * // Dado 3 columnas para el tamaño seleccionado, 16px de separación, 32px de padding horizontal total y una ventana de 1024px:
 * // totalGap = 16 * (3 - 1) = 32
 * // disponible = 1024 - 32 - 32 = 960
 * // elementWidth = 960 / 3 = 320
 */
export const calculateGridElementWidth = (
  size: SizeType,
  colsConfig: NumColsConfig,
  containerGap: number,
  containerVerticalPadding: number,
  windowWidth: number
) => {
  const numCols = colsConfig[size];
  const totalGap = containerGap * (numCols - 1);

  const elementWidth: DimensionValue =
    (windowWidth - totalGap - containerVerticalPadding) / numCols;

  return elementWidth;
};
