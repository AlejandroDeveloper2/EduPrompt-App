import { TranslateOptions } from "i18n-js";

import { AppLanguage } from "@/core/types";

export const APP_LANGUAGES = (
  t: (key: string, options?: TranslateOptions) => string,
): AppLanguage[] => [
  {
    key: "es",
    label: t("settings_translations.languages_list_options_labels.spanish"),
  },
  {
    key: "en",
    label: t("settings_translations.languages_list_options_labels.english"),
  },
  {
    key: "pt",
    label: t("settings_translations.languages_list_options_labels.portuguese"),
  },
  {
    key: "system",
    label: t("settings_translations.languages_list_options_labels.system"),
  },
];
