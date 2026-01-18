import { TranslateOptions } from "i18n-js";

import { CleanFrecuencyOption } from "../types";

export const CLEAN_FRECUENCY_OPTIONS = (
  t: (key: string, options?: TranslateOptions) => string,
): CleanFrecuencyOption[] => [
  {
    key: "2-days",
    frecuency: 2,
    label: t("settings-translations.frecuency-list-options-labels.2-days"),
  },
  {
    key: "5-days",
    frecuency: 5,
    label: t("settings-translations.frecuency-list-options-labels.5-days"),
  },
  {
    key: "15-days",
    frecuency: 15,
    label: t("settings-translations.frecuency-list-options-labels.15-days"),
  },
  {
    key: "30-days",
    frecuency: 30,
    label: t("settings-translations.frecuency-list-options-labels.30-days"),
  },
];
