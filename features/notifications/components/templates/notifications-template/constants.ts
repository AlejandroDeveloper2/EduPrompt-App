import { i18n } from "@/core/store";

export const LIST_TABS = [
  {
    tabId: "tab-1",
    label: i18n.t("notifications-translations.lists-tabulator-labels.tab-1"),
  },
  {
    tabId: "tab-2",
    label: i18n.t("notifications-translations.lists-tabulator-labels.tab-2"),
  },
] as const;
