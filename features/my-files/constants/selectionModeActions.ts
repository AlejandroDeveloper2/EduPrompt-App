import { NavOption } from "@/core/types";

export const SELECTION_MODE_ACTIONS = (
  deleteSelectedNotifications: () => void,
  shareFolders: () => void
): NavOption[] => [
  {
    navItemId: "action-1",
    icon: "trash-bin-outline",
    onPress: deleteSelectedNotifications,
    label: "Eliminar",
  },
  {
    navItemId: "action-2",
    icon: "share-outline",
    onPress: shareFolders,
    label: "Compartir",
  },
];

export const FILE_SELECTION_MODE_ACTIONS = (
  deleteManyFiles: () => void,
  shareFiles: () => void,
  moveFiles: () => void
): NavOption[] => [
  {
    navItemId: "action-1",
    icon: "trash-bin-outline",
    onPress: deleteManyFiles,
    label: "Eliminar",
  },
  {
    navItemId: "action-2",
    icon: "share-outline",
    onPress: shareFiles,
    label: "Compartir",
  },
  {
    navItemId: "action-3",
    icon: "move-outline",
    onPress: moveFiles,
    label: "Mover",
  },
];
