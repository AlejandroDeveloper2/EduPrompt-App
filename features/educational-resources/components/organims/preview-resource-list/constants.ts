import { TranslateOptions } from "i18n-js";

export const RESOURCE_PREVIEW_TABS = (
  t: (key: string, options?: TranslateOptions) => string,
) =>
  [
    {
      tabId: "tab-1",
      label: t(
        "resources_translations.resources_list_labels.popups_tabulator_labels.tab_1",
      ),
    },
    {
      tabId: "tab-2",
      label: t(
        "resources_translations.resources_list_labels.popups_tabulator_labels.tab_2",
      ),
    },
  ] as const;
