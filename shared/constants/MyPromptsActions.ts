import { Lang, NavOption } from "@/core/types";

export const MY_PROMPTS_ACTIONS: Lang<NavOption> = {
  en: [
    {
      navItemId: "item-action-1",
      label: "Delete",
      icon: "trash-bin-outline",
      onPress: () => {},
    },
    {
      navItemId: "item-action-2",
      label: "Relabeling",
      icon: "pricetag-outline",
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
      label: "Reetiquetar",
      icon: "pricetag-outline",
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
      label: "Re-rotulagem",
      icon: "pricetag-outline",
      onPress: () => {},
    },
  ],
};
