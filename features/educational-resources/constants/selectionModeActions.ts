import { NavOption } from "@/core/types";

import { i18n } from "@/core/store";

export const SELECTION_MODE_ACTIONS = (
  deleteResources: () => void,
  shareResources: () => void,
): NavOption[] => [
  {
    navItemId: "action-1",
    icon: "trash-bin-outline",
    onPress: deleteResources,
    label: i18n.t(
      "resources_translations.resources_list_labels.selection_options_labels.delete_resources",
    ),
  },
  {
    navItemId: "action-2",
    icon: "share-outline",
    onPress: shareResources,
    label: i18n.t(
      "resources_translations.resources_list_labels.selection_options_labels.share_resources",
    ),
  },
];
