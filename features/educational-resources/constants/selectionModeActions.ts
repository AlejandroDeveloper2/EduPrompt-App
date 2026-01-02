import { NavOption } from "@/core/types";

export const SELECTION_MODE_ACTIONS = (
  deleteResources: () => void,
  downloadResources: () => void
): NavOption[] => [
  {
    navItemId: "action-1",
    icon: "trash-bin-outline",
    onPress: deleteResources,
    label: "Eliminar",
  },
  {
    navItemId: "action-2",
    icon: "download-outline",
    onPress: downloadResources,
    label: "Descargar",
  },
];
