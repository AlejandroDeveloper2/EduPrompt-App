import { i18n } from "@/core/store";
import { NavOption } from "@/core/types";

export const SELECTION_MODE_ACTIONS = (
  deletePrompts: () => void
): NavOption[] => [
  {
    navItemId: "action-1",
    icon: "trash-bin-outline",
    onPress: deletePrompts,
    label: i18n.t(
      "prompts-translations.prompt-list-labels.selection-options-labels.delete-prompts"
    ),
  },
];
