import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { Prompt } from "../../types";

import { useAnimatedCard } from "@/shared/hooks/animations";
import { useResponsive, useTranslations } from "@/shared/hooks/core";
import { usePromptsSelectionStore } from "../../store";
import usePromptTags from "./usePromptTags";

const usePromptCardListLogic = (promptData: Prompt) => {
  const size = useResponsive();

  const { selectionMode, selectedPromptIds, toggleSelection } =
    usePromptsSelectionStore(
      useShallow((state) => ({
        selectionMode: state.selectionMode,
        selectedPromptIds: state.selectedPromptIds,
        toggleSelection: state.toggleSelection,
      })),
    );

  const { tags } = usePromptTags();

  const isSelected: boolean = useMemo(
    () => selectedPromptIds.has(promptData.promptId),
    [promptData.promptId, selectedPromptIds],
  );

  const animatedCardStyle = useAnimatedCard(isSelected);

  const { t } = useTranslations();

  return {
    size,
    isSelected,
    animatedCardStyle,
    tags,
    toggleSelection,
    selectionMode,
    t,
  };
};

export default usePromptCardListLogic;
