import { NavOption } from "@/core/types";

export const SELECTION_MODE_ACTIONS = (
  deleteSelectedNotifications: () => void
): NavOption[] => [
  {
    navItemId: "action-1",
    icon: "trash-bin-outline",
    onPress: deleteSelectedNotifications,
    label: "Eliminar",
  },
];
