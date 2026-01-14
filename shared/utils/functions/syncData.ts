import { i18n } from "@/core/store";

import { showToast } from "@/shared/context";

import { generateToastKey } from "@/shared/helpers";

export const syncData = (
  isConnected: boolean | null,
  isAuthenticated: boolean,
  isDataSynced: boolean,
  mutationCallback: () => void
) => {
  if (isConnected === false) {
    showToast({
      key: generateToastKey(),
      variant: "danger",
      message: i18n.t(
        "common-translations.sync-data-messages.no-connected-msg"
      ),
    });
    return;
  }

  if (!isAuthenticated) {
    showToast({
      key: generateToastKey(),
      variant: "danger",
      message: i18n.t("common-translations.sync-data-messages.no-auth-msg"),
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
    message: i18n.t("common-translations.sync-data-messages.all-synced-msg"),
  });
};
