import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { Prompt } from "../../types";

import { useSelectionModeStore } from "@/core/store";
import { useAnimatedCard } from "@/shared/hooks/animations";
import { useResponsive, useTranslations } from "@/shared/hooks/core";
import { usePromptsSelectionStore } from "../../store";
import usePromptTags from "./usePromptTags";

const usePromptCardListLogic = (promptData: Prompt) => {
  const size = useResponsive();

  const { selectedPromptIds, toggleSelection } = usePromptsSelectionStore(
    useShallow((state) => ({
      selectedPromptIds: state.selectedPromptIds,
      toggleSelection: state.toggleSelection,
    })),
  );

  const selectionMode = useSelectionModeStore(
    useShallow((state) => state.selectionMode),
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
