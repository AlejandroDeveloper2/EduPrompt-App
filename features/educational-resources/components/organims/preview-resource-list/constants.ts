import { i18n } from "@/core/store";

export const RESOURCE_PREVIEW_TABS = [
  {
    tabId: "tab-1",
    label: i18n.t(
      "resources-translations.resources-list-labels.popups-tabulator-labels.tab-1"
    ),
  },
  {
    tabId: "tab-2",
    label: i18n.t(
      "resources-translations.resources-list-labels.popups-tabulator-labels.tab-2"
    ),
  },
] as const;
