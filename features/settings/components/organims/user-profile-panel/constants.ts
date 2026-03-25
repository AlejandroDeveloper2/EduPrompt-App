import { TranslateOptions } from "i18n-js";

export const FORM_TABS = (
  t: (key: string, options?: TranslateOptions) => string,
) =>
  [
    {
      tabId: "tab-1",
      label: t(
        "settings_translations.user_profile_panel.form_tabulator_labels.tab_1",
      ),
    },
    {
      tabId: "tab-2",
      label: t(
        "settings_translations.user_profile_panel.form_tabulator_labels.tab_2",
      ),
    },
    {
      tabId: "tab-3",
      label: t(
        "settings_translations.user_profile_panel.form_tabulator_labels.tab_3",
      ),
    },
  ] as const;
