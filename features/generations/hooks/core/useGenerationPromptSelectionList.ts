import { useRouter } from "expo-router";
import { useShallow } from "zustand/react/shallow";

import { Prompt } from "@/features/prompts/types";

import { useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import {
  useGenerationPromptViewStore,
  useGenerationTagsStore,
  useResourceGenerationStore,
} from "../../store";

const useGenerationPromptSelectionList = () => {
  const router = useRouter();
  const { t } = useTranslations();

  const { currentIaGeneration, updateIaGeneration } =
    useResourceGenerationStore(
      useShallow((state) => ({
        currentIaGeneration: state.currentIaGeneration,
        updateIaGeneration: state.updateIaGeneration,
      })),
    );

  const { tagFilter, onTagFilterChange } = useGenerationTagsStore(
    useShallow((state) => ({
      tagFilter: state.tagFilter,
      onTagFilterChange: state.onTagFilterChange,
    })),
  );

  const { selectedPrompt, isTagSelection } = useGenerationPromptViewStore(
    useShallow((state) => ({
      selectedPrompt: state.selectedPrompt,
      isTagSelection: state.isTagSelection,
    })),
  );

  const paginatedPrompts = useEventbusValue("prompts.list.pagination.updated", {
    prompts: [],
    hasNextPage: false,
    isFetchingNextPage: false,
    refreshing: false,
  });

  const handleSelectPrompt = (prompt: Prompt) => {
    if (!currentIaGeneration) return;
    updateIaGeneration(
      currentIaGeneration.generationId,
      { resourceDescriptionPrompt: prompt.promptText },
      {},
      {},
    );
    router.back();
  };

  return {
    t,
    tagFilter,
    selectedPrompt,
    isTagSelection,
    paginatedPrompts,
    onTagFilterChange,
    handleSelectPrompt,
  };
};

export default useGenerationPromptSelectionList;
