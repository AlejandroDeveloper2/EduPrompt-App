import { FontStyle, ScreenSizeStyle } from "@/lib/types";

/** Tamaños de fuentes para diferentes tamaños de pantalla */
export const FontSizes: ScreenSizeStyle<FontStyle> = {
  mobile: {
    display: 32,
    h1: 26,
    h2: 22,
    button: 18,
    paragraph: 14,
    caption: 10,
  },
  tablet: {
    display: 36,
    h1: 28,
    h2: 24,
    button: 20,
    paragraph: 16,
    caption: 12,
  },
  laptop: {
    display: 36,
    h1: 28,
    h2: 24,
    button: 20,
    paragraph: 16,
    caption: 12,
  },
};

/** Tamaños de iconos para diferentes tamaños de pantalla */
export const FontIconSizes: ScreenSizeStyle<FontStyle> = {
  mobile: {
    display: 32,
    h1: 26,
    h2: 22,
    button: 18,
    paragraph: 16,
    caption: 14,
  },
  tablet: {
    display: 36,
    h1: 28,
    h2: 24,
    button: 20,
    paragraph: 18,
    caption: 16,
  },
  laptop: {
    display: 36,
    h1: 28,
    h2: 24,
    button: 20,
    paragraph: 18,
    caption: 16,
  },
};
