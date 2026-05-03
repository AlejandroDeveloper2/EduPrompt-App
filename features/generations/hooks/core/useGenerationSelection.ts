import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";

import { useGenerationsSelectionStore } from "../../store";
import useGenerations from "./useGenerations";

const useGenerationSelection = () => {
  const generationIdsRef = useRef<string[]>([]);

  const { filteredElements } = useGenerations();

  const selectionStore = useGenerationsSelectionStore(
    useShallow((state) => ({
      selectedGenerationIds: state.selectedGenerationIds,
      selectionMode: state.selectionMode,
      isAllSelected: state.isAllSelected,
      selectionCount: state.selectionCount,
      toggleSelectionMode: state.toggleSelectionMode,
      toggleSelectAll: state.toggleSelectAll,
    })),
  );

  useEffect(() => {
    generationIdsRef.current = filteredElements.map((g) => g.generationId);
  }, [filteredElements]);

  return {
    ...selectionStore,
    toggleSelectAll: () => {
      if (selectionStore.isAllSelected) selectionStore.toggleSelectAll([]);
      else selectionStore.toggleSelectAll(generationIdsRef.current);
    },
  };
};

export default useGenerationSelection;
