import { AppLanguage } from "@/core/types";

import { i18n } from "@/core/store";

export const APP_LANGUAGES: AppLanguage[] = [
  {
    key: "es",
    label: i18n.t(
      "settings-translations.languages-list-options-labels.spanish"
    ),
  },
  {
    key: "en",
    label: i18n.t(
      "settings-translations.languages-list-options-labels.english"
    ),
  },
  {
    key: "pt",
    label: i18n.t(
      "settings-translations.languages-list-options-labels.portuguese"
    ),
  },
  {
    key: "system",
    label: i18n.t("settings-translations.languages-list-options-labels.system"),
  },
];
