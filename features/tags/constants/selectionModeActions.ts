import { NavOption } from "@/core/types";

export const SELECTION_MODE_ACTIONS = (deleteTags: () => void): NavOption[] => [
  {
    navItemId: "action-1",
    icon: "trash-bin-outline",
    onPress: deleteTags,
    label: "Eliminar",
  },
];
