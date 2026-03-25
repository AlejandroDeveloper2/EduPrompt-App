import { i18n } from "@/core/store";

export const LIST_TABS = () =>
  [
    {
      tabId: "tab-1",
      label: i18n.t("notifications_translations.lists_tabulator_labels.tab_1"),
    },
    {
      tabId: "tab-2",
      label: i18n.t("notifications_translations.lists_tabulator_labels.tab_2"),
    },
  ] as const;
