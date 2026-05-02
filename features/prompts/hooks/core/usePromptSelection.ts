import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";

import { usePromptsSelectionStore } from "../../store";
import usePrompts from "./usePrompts";

const usePromptSelection = () => {
  const promptIdsRef = useRef<string[]>([]);

  const { prompts } = usePrompts();

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
    promptIdsRef.current = prompts.map((p) => p.promptId);
  }, [prompts]);

  return {
    ...selectionStore,
    toggleSelectAll: () => {
      if (selectionStore.isAllSelected) selectionStore.toggleSelectAll([]);
      else selectionStore.toggleSelectAll(promptIdsRef.current);
    },
  };
};

export default usePromptSelection;
