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

export const getFontFamily = (weight: FontWeigthType): string => {
  const fontFamilyIndex = FONT_FAMILIES.findIndex(
    (fontFamily) => fontFamily.weight === weight
  );
  return FONT_FAMILIES[fontFamilyIndex].name;
};
