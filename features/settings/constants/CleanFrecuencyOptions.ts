import { TranslateOptions } from "i18n-js";

import { CleanFrecuencyOption } from "../types";

export const CLEAN_FRECUENCY_OPTIONS = (
  t: (key: string, options?: TranslateOptions) => string,
): CleanFrecuencyOption[] => [
  {
    key: "2-days",
    frecuency: 2,
    label: t("settings_translations.frecuency_list_options_labels.2_days"),
  },
  {
    key: "5-days",
    frecuency: 5,
    label: t("settings_translations.frecuency_list_options_labels.5_days"),
  },
  {
    key: "15-days",
    frecuency: 15,
    label: t("settings_translations.frecuency_list_options_labels.15_days"),
  },
  {
    key: "30-days",
    frecuency: 30,
    label: t("settings_translations.frecuency_list_options_labels.30_days"),
  },
];
