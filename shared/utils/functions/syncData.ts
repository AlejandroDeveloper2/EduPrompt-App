import { showToast } from "@/shared/context";

import { generateToastKey } from "@/shared/helpers";

export const syncData = (
  isConnected: boolean | null,
  token: string | null,
  isDataSynced: boolean,
  mutationCallback: () => void
) => {
  if (isConnected === false) {
    showToast({
      key: generateToastKey(),
      variant: "danger",
      message: "Conectate a internet para sincronizar tus datos.",
    });
    return;
  }

  if (!token) {
    showToast({
      key: generateToastKey(),
      variant: "danger",
      message:
        "Inicia sesión o crea una cuenta para poder sincronizar tus datos.",
    });
    return;
  }

  if (!isDataSynced) {
    mutationCallback();
    return;
  }

  showToast({
    key: generateToastKey(),
    variant: "primary",
    message: "Todo esta sincronizado",
  });
};
