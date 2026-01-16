import { NavOption } from "@/core/types";

import { i18n } from "@/core/store";

export const SELECTION_MODE_ACTIONS = (
  deleteResources: () => void,
  downloadResources: () => void
): NavOption[] => [
  {
    navItemId: "action-1",
    icon: "trash-bin-outline",
    onPress: deleteResources,
    label: i18n.t(
      "resources-translations.resources-list-labels.selection-options-labels.delete-resources"
    ),
  },
  {
    navItemId: "action-2",
    icon: "download-outline",
    onPress: downloadResources,
    label: i18n.t(
      "resources-translations.resources-list-labels.selection-options-labels.download-resources"
    ),
  },
];
