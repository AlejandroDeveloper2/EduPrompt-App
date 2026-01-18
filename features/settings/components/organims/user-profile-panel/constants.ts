import { TranslateOptions } from "i18n-js";

export const FORM_TABS = (
  t: (key: string, options?: TranslateOptions) => string,
) =>
  [
    {
      tabId: "tab-1",
      label: t(
        "settings-translations.user-profile-panel.form-tabulator-labels.tab-1",
      ),
    },
    {
      tabId: "tab-2",
      label: t(
        "settings-translations.user-profile-panel.form-tabulator-labels.tab-2",
      ),
    },
    {
      tabId: "tab-3",
      label: t(
        "settings-translations.user-profile-panel.form-tabulator-labels.tab-3",
      ),
    },
  ] as const;
