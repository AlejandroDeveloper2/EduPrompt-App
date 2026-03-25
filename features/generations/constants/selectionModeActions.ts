import { NavOption } from "@/core/types";

import { i18n } from "@/core/store";

export const SELECTION_MODE_ACTIONS = (
  deleteIaGeneration: () => void,
  reinitGeneration: () => void,
): NavOption[] => [
  {
    navItemId: "action-1",
    icon: "trash-bin-outline",
    onPress: deleteIaGeneration,
    label: t(
        "generations_translations.generation_list_labels.selection_options_labels.delete_generations",
    ),
  },
  {
    navItemId: "action-2",
    icon: "reload-outline",
    onPress: reinitGeneration,
    label: t(
        "generations_translations.generation_list_labels.selection_options_labels.reinit_generations",
    ),
  },
];
