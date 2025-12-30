import { NavOption } from "@/core/types";

export const SELECTION_MODE_ACTIONS = (
  deletePrompts: () => void
): NavOption[] => [
  {
    navItemId: "action-1",
    icon: "trash-bin-outline",
    onPress: deletePrompts,
    label: "Eliminar",
  },
];
