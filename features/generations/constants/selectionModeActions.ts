import { NavOption } from "@/core/types";

export const SELECTION_MODE_ACTIONS = (
  deleteIaGeneration: () => void,
  reinitGeneration: () => void
): NavOption[] => [
  {
    navItemId: "action-1",
    icon: "trash-bin-outline",
    onPress: deleteIaGeneration,
    label: "Eliminar",
  },
  {
    navItemId: "action-2",
    icon: "reload-outline",
    onPress: reinitGeneration,
    label: "Reiniciar",
  },
];
