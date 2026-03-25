import { i18n } from "@/core/store";
import { NavOption } from "@/core/types";

export const SELECTION_MODE_ACTIONS = (deleteTags: () => void): NavOption[] => [
  {
    navItemId: "action-1",
    icon: "trash-bin-outline",
    onPress: deleteTags,
    label: i18n.t(
      "tags_translations.tag_list_labels.selection_options_labels.delete_tags"
    ),
  },
];
