import { Ionicons } from "@expo/vector-icons";
import { RelativePathString } from "expo-router";
import { ComponentRef } from "react";
import { TextInput } from "react-native";
import { z } from "zod";

/** Tipos globales compartidos */
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

type ProgressConfig = {
  mode: "progress-counter" | "duration-timer";
  limit: number;
};

type ProcessType = "generation" | "downloading" | "deleting";

type ViewerType = "image" | "text" | "table/chart";

type NavigationPropsBase = {
  actions: NavOption[];
};

type FormErrors<T> = {
  [K in keyof T]?: T[K] extends (infer U)[]
    ? U extends object
      ? (FormErrors<U> | undefined)[]
      : string[]
    : string[];
};

type TextInputInstance = ComponentRef<typeof TextInput>;

type ProcessStateType = "pending" | "done" | "in-progress" | "error";

type Lang<T> = {
  en: T[];
  es: T[];
  pt: T[];
};

interface Step<T> {
  stepId: string;
  stepIcon: keyof typeof Ionicons.glyphMap;
  stepTitle: string;
  description: string;
  stepIllustration: T;
}

interface FormatFilter {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}

interface NavOption {
  navItemId: string;
  label?: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

interface Process {
  processId: string;
  type: ProcessType;
  processName: string;
  progressConfig: ProgressConfig;
  progress: number;
  state: ProcessStateType;
  startTime: number;
  tasksDone?: number;
}

interface AppLanguage {
  key: "es" | "pt" | "en";
  label: string;
}

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

interface StepType {
  to: RelativePathString;
  stepId: string;
}

interface FormConfig<T> {
  initialValues: T;
  validationSchema: z.ZodType<T>;
  actionCallback: () => void;
  noReset?: boolean;
}

interface CodeValue {
  character1: string;
  character2: string;
  character3: string;
  character4: string;
}

interface Tab {
  tabId: string;
  label: string;
}

interface ServerResponse<T> {
  data: T;
  message: string;
}

interface PaginatedResponse<T> {
  records: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

interface ServerErrorResponse {
  name: string;
  httpCode: number;
  isOperational: boolean;
  description: string;
}

type InfiniteQueryOptions = {
  limit?: number;
  enabled?: boolean;
};

export {
  AlertVariantType,
  AlignTextType,
  AppLanguage,
  BadgeVariantType,
  BasicColor,
  ButtonVariantType,
  ButtonWidthType,
  CodeValue,
  ColorSchema,
  ColorVariation,
  ColorVariationExtended,
  FontSizeType,
  FontStyle,
  FontWeigthType,
  FormatFilter,
  FormConfig,
  FormErrors,
  InfiniteQueryOptions,
  Lang,
  NavigationPropsBase,
  NavOption,
  PaginatedResponse,
  Process,
  ProcessType,
  ProgressConfig,
  RadiusStyle,
  RadiusValuesType,
  ScreenBreakpoint,
  ScreenSizeStyle,
  ServerErrorResponse,
  ServerResponse,
  SizeType,
  SpacingNamesType,
  SpacingStyle,
  Step,
  StepType,
  Tab,
  TextInputInstance,
  ToastVariantType,
  TypographyType,
  ViewerType,
};
