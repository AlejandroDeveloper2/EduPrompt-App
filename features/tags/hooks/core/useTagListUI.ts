import { useCallback, useMemo } from "react";

import { Tag } from "../../types";

import { SELECTION_MODE_ACTIONS } from "../../constants";

import { useResponsive, useTranslations } from "@/shared/hooks/core";
import { useRouter } from "expo-router";
import { useTagViewStore } from "../../store";
import { useDeleteDialogContext } from "../context";

const useTagListUI = () => {
  const router = useRouter();
  const size = useResponsive();
  const { t } = useTranslations();

  const confirmTagDeleteDialog = useDeleteDialogContext();

  const actions = useMemo(
    () => SELECTION_MODE_ACTIONS(confirmTagDeleteDialog.openAlert),
    [confirmTagDeleteDialog],
  );

  const handleViewTag = useCallback(
    (tag: Tag) => {
      useTagViewStore.getState().setSelectedTag(tag);
      router.navigate("/(app)/update_tag_sheet");
    },
    [router],
  );

  return {
    size,
    t,
    actions,
    confirmTagDeleteDialog,
    handleViewTag,
  };
};

export default useTagListUI;
