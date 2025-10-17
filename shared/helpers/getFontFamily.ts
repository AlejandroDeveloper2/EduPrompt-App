import { FontWeigthType } from "@/core/types";

interface FontFamily {
  name: string;
  weight: FontWeigthType;
}

const FONT_FAMILIES: FontFamily[] = [
  {
    name: "Outfit_300Light",
    weight: "light",
  },
  {
    name: "Outfit_400Regular",
    weight: "regular",
  },
  {
    name: "Outfit_500Medium",
    weight: "medium",
  },
  {
    name: "Outfit_700Bold",
    weight: "bold",
  },
];

/**
 * Obtiene el nombre de la familia tipográfica correspondiente a un peso de fuente específico.
 *
 * Esta función busca en la lista `FONT_FAMILIES` el objeto cuyo `weight` coincida con el valor recibido
 * y retorna el nombre (`name`) de la fuente asociada.
 *
 * @param {FontWeigthType} weight - Peso tipográfico a buscar (por ejemplo: `"light"`, `"regular"`, `"medium"`, `"bold"`).
 * @returns {string} Nombre de la familia tipográfica correspondiente al peso especificado.
 *
 * @example
 * // Retorna "Outfit_400Regular"
 * getFontFamily("regular");
 *
 * @example
 * // Retorna "Outfit_700Bold"
 * getFontFamily("bold");
 *
 * @throws {Error} Si no se encuentra una fuente con el peso especificado.
 */
export const getFontFamily = (weight: FontWeigthType): string => {
  const fontFamilyIndex = FONT_FAMILIES.findIndex(
    (fontFamily) => fontFamily.weight === weight
  );
  return FONT_FAMILIES[fontFamilyIndex].name;
};
