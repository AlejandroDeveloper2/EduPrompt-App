import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";

import { Prompt } from "../../types";

import { SELECTION_MODE_ACTIONS } from "../../constants";

import { useResponsive, useTranslations } from "@/shared/hooks/core";
import { usePromptViewStore } from "../../store";
import { useDeleteDialogContext } from "../context";
import usePromptTags from "./usePromptTags";

const usePromptListUI = () => {
  const router = useRouter();
  const size = useResponsive();
  const { t } = useTranslations();

  const confirmPromptDeleteDialog = useDeleteDialogContext();

  const paginatedTags = usePromptTags();

  const actions = useMemo(
    () => SELECTION_MODE_ACTIONS(confirmPromptDeleteDialog.openAlert),
    [confirmPromptDeleteDialog],
  );

  const handleViewPrompt = useCallback(
    (prompt: Prompt) => {
      usePromptViewStore.getState().setSelectedPrompt(prompt);
      router.navigate("/(app)/update_prompt_sheet");
    },
    [router],
  );

  return {
    router,
    size,
    t,
    actions,
    paginatedTags,
    confirmPromptDeleteDialog,
    handleViewPrompt,
  };
};

export default usePromptListUI;
