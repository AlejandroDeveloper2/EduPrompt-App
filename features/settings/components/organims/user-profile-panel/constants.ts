import { i18n } from "@/core/store";

export const FORM_TABS = [
  {
    tabId: "tab-1",
    label: i18n.t(
      "settings-translations.user-profile-panel.form-tabulator-labels.tab-1"
    ),
  },
  {
    tabId: "tab-2",
    label: i18n.t(
      "settings-translations.user-profile-panel.form-tabulator-labels.tab-2"
    ),
  },
  {
    tabId: "tab-3",
    label: i18n.t(
      "settings-translations.user-profile-panel.form-tabulator-labels.tab-3"
    ),
  },
] as const;
