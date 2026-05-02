import { useMemo } from "react";

import { SELECTION_MODE_ACTIONS } from "../../constants";

import { useResponsive, useTranslations } from "@/shared/hooks/core";
import { useDeleteDialogContext } from "../context";

const useNotificationListUI = () => {
  const size = useResponsive();
  const { t, lang } = useTranslations();

  const confirmDeleteDialog = useDeleteDialogContext();

  const actions = useMemo(
    () => SELECTION_MODE_ACTIONS(confirmDeleteDialog.openAlert),
    [confirmDeleteDialog],
  );

  return {
    size,
    t,
    lang,
    actions,
    confirmDeleteDialog,
  };
};

export default useNotificationListUI;
