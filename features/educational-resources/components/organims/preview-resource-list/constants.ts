import { TranslateOptions } from "i18n-js";

export const RESOURCE_PREVIEW_TABS = (
  t: (key: string, options?: TranslateOptions) => string,
) =>
  [
    {
      tabId: "tab-1",
      label: t(
        "resources-translations.resources-list-labels.popups-tabulator-labels.tab-1",
      ),
    },
    {
      tabId: "tab-2",
      label: t(
        "resources-translations.resources-list-labels.popups-tabulator-labels.tab-2",
      ),
    },
  ] as const;
