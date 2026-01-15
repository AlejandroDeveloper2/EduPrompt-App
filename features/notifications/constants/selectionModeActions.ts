import { NavOption } from "@/core/types";

import { i18n } from "@/core/store";

export const SELECTION_MODE_ACTIONS = (
  deleteSelectedNotifications: () => void
): NavOption[] => [
  {
    navItemId: "action-1",
    icon: "trash-bin-outline",
    onPress: deleteSelectedNotifications,
    label: i18n.t(
      "notifications-translations.selection-mode-actions-labels.delete"
    ),
  },
];
