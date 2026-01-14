import { CleanFrecuencyOption } from "../types";

import { i18n } from "@/core/store";

export const CLEAN_FRECUENCY_OPTIONS: CleanFrecuencyOption[] = [
  {
    key: "2-days",
    frecuency: 2,
    label: i18n.t("settings-translations.frecuency-list-options-labels.2-days"),
  },
  {
    key: "5-days",
    frecuency: 5,
    label: i18n.t("settings-translations.frecuency-list-options-labels.5-days"),
  },
  {
    key: "15-days",
    frecuency: 15,
    label: i18n.t(
      "settings-translations.frecuency-list-options-labels.15-days"
    ),
  },
  {
    key: "30-days",
    frecuency: 30,
    label: i18n.t(
      "settings-translations.frecuency-list-options-labels.30-days"
    ),
  },
];
