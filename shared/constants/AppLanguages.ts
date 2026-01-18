import { TranslateOptions } from "i18n-js";

import { AppLanguage } from "@/core/types";

export const APP_LANGUAGES = (
  t: (key: string, options?: TranslateOptions) => string,
): AppLanguage[] => [
  {
    key: "es",
    label: t("settings-translations.languages-list-options-labels.spanish"),
  },
  {
    key: "en",
    label: t("settings-translations.languages-list-options-labels.english"),
  },
  {
    key: "pt",
    label: t("settings-translations.languages-list-options-labels.portuguese"),
  },
  {
    key: "system",
    label: t("settings-translations.languages-list-options-labels.system"),
  },
];
