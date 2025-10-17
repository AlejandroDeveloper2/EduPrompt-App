import { Lang, NavOption } from "@/core/types";

/** Opciones o acciones de la vista de carpetas de recursos descargados */
export const FOLDER_ACTIONS: Lang<NavOption> = {
  en: [
    {
      navItemId: "item-action-1",
      label: "Delete",
      icon: "trash-bin-outline",
      onPress: () => {},
    },
    {
      navItemId: "item-action-2",
      label: "Share",
      icon: "share-social-outline",
      onPress: () => {},
    },
  ],
  es: [
    {
      navItemId: "item-action-1",
      label: "Eliminar",
      icon: "trash-bin-outline",
      onPress: () => {},
    },
    {
      navItemId: "item-action-2",
      label: "Compartir",
      icon: "share-social-outline",
      onPress: () => {},
    },
  ],
  pt: [
    {
      navItemId: "item-action-1",
      label: "Excluir",
      icon: "trash-bin-outline",
      onPress: () => {},
    },
    {
      navItemId: "item-action-2",
      label: "Compartilhar",
      icon: "share-social-outline",
      onPress: () => {},
    },
  ],
};
