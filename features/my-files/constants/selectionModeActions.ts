import { i18n } from "@/core/store";
import { NavOption } from "@/core/types";

export const SELECTION_MODE_ACTIONS = (
  deleteSelectedNotifications: () => void,
  shareFolders: () => void
): NavOption[] => [
  {
    navItemId: "action-1",
    icon: "trash-bin-outline",
    onPress: deleteSelectedNotifications,
    label: i18n.t(
      "my-files-translations.folder-list-labels.selection-options-labels.delete-folders"
    ),
  },
  {
    navItemId: "action-2",
    icon: "share-outline",
    onPress: shareFolders,
    label: i18n.t(
      "my-files-translations.folder-list-labels.selection-options-labels.share-folders"
    ),
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
    label: i18n.t(
      "my-files-translations.file-list-labels.selection-options-labels.delete-files"
    ),
  },
  {
    navItemId: "action-2",
    icon: "share-outline",
    onPress: shareFiles,
    label: i18n.t(
      "my-files-translations.file-list-labels.selection-options-labels.share-files"
    ),
  },
  {
    navItemId: "action-3",
    icon: "move-outline",
    onPress: moveFiles,
    label: i18n.t(
      "my-files-translations.file-list-labels.selection-options-labels.move-files"
    ),
  },
];
