import { NavOption } from "@/core/types";

import { i18n } from "@/core/store";

export const SELECTION_MODE_ACTIONS = (
  deleteIaGeneration: () => void,
  reinitGeneration: () => void
): NavOption[] => [
  {
    navItemId: "action-1",
    icon: "trash-bin-outline",
    onPress: deleteIaGeneration,
    label: i18n.t(
      "generations-translations.generation-list-labels.selection-options-labels.delete-generation"
    ),
  },
  {
    navItemId: "action-2",
    icon: "reload-outline",
    onPress: reinitGeneration,
    label: i18n.t(
      "generations-translations.generation-list-labels.selection-options-labels.reinit-generations"
    ),
  },
];
