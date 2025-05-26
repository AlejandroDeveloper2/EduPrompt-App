import { RelativePathString } from "expo-router";

type SpacingNamesType =
  | "null"
  | "4xs"
  | "3xs"
  | "2xs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl";

type RadiusValuesType = "null" | "sm" | "md" | "lg" | "rounded" | "pilled";

type TypographyType =
  | "display"
  | "h1"
  | "h2"
  | "button"
  | "paragraph"
  | "caption";

type AlignTextType = "center" | "left" | "right" | "justify";

type FontWeigthType = "bold" | "medium" | "regular" | "light";

type ButtonVariantType = "primary" | "danger" | "neutral";
type BadgeVariantType = ButtonVariantType;
type ToastVariantType = ButtonVariantType;
type AlertVariantType = "success" | "danger" | "info";

type ButtonWidthType = number | "100%" | "auto";

type SizeType = "mobile" | "tablet" | "laptop";

type FontSizeType = SizeType;

interface SpacingStyle {
  spacing_null: number;
  spacing_4xs: number;
  spacing_3xs: number;
  spacing_2xs: number;
  spacing_xs: number;
  spacing_sm: number;
  spacing_md: number;
  spacing_lg: number;
  spacing_xl: number;
  spacing_2xl: number;
  spacing_3xl: number;
  spacing_4xl: number;
}

interface RadiusStyle {
  radius_null: number;
  radius_sm: number;
  radius_md: number;
  radius_lg: number;
  radius_pilled: number;
  radius_rounded: string;
}

interface FontStyle {
  display: number;
  h1: number;
  h2: number;
  button: number;
  paragraph: number;
  caption: number;
}

interface ColorVariation {
  "25": string;
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
}

interface ColorVariationExtended extends ColorVariation {
  "0": string;
  "1000": string;
}

interface BasicColor {
  white: string;
  black: string;
}

interface ColorSchema {
  primary: ColorVariation;
  neutral: ColorVariationExtended;
  danger: ColorVariation;
  basic: BasicColor;
}

interface ScreenSizeStyle<T> {
  mobile: T;
  tablet: T;
  laptop: T;
}

interface ScreenBreakpoint {
  mobile: number;
  tablet: number;
  laptop: number;
}

type ProgressConfig = {
  mode: "progress-counter" | "duration-timer";
  limit: number;
};

interface StepType {
  to: RelativePathString;
  stepId: string;
}

type ProcessType = "generation" | "downloading" | "deleting";
type ViewerType = "image" | "text" | "table/chart";
type NavigationPropsBase = {
  actions: NavOption[];
};

export {
  AlertVariantType,
  AlignTextType,
  BadgeVariantType,
  BasicColor,
  ButtonVariantType,
  ButtonWidthType,
  ColorSchema,
  ColorVariation,
  ColorVariationExtended,
  FontSizeType,
  FontStyle,
  FontWeigthType,
  NavigationPropsBase,
  ProcessType,
  ProgressConfig,
  RadiusStyle,
  RadiusValuesType,
  ScreenBreakpoint,
  ScreenSizeStyle,
  SizeType,
  SpacingNamesType,
  SpacingStyle,
  StepType,
  ToastVariantType,
  TypographyType,
  ViewerType,
};
