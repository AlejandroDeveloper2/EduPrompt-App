import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";

import { PaginatedResponse } from "@/core/types";
import { Prompt } from "../../types";

import { usePromptsSelectionStore } from "../../store";

const usePromptSelection = () => {
  const promptIdsRef = useRef<string[]>([]);

  const queryClient = useQueryClient();

  const selectionStore = usePromptsSelectionStore(
    useShallow((state) => ({
      selectedPromptIds: state.selectedPromptIds,
      selectionMode: state.selectionMode,
      isAllSelected: state.isAllSelected,
      selectionCount: state.selectionCount,
      toggleSelectionMode: state.toggleSelectionMode,
      toggleSelectAll: state.toggleSelectAll,
    })),
  );

  useEffect(() => {
    const cachedPrompts = queryClient.getQueryData<PaginatedResponse<Prompt>>([
      "prompts",
    ]);
    if (cachedPrompts) {
      promptIdsRef.current = cachedPrompts.records.map((p) => p.promptId);
    }
  }, [queryClient]);

  return {
    ...selectionStore,
    toggleSelectAll: () => {
      if (selectionStore.isAllSelected) selectionStore.toggleSelectAll([]);
      else selectionStore.toggleSelectAll(promptIdsRef.current);
    },
  };
};

export default usePromptSelection;
