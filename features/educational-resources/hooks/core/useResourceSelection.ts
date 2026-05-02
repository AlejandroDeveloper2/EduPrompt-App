import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";

import { useResourcesSelectionStore } from "../../store";
import useResources from "./useResources";

const useResourceSelection = () => {
  const resourceIdsRef = useRef<string[]>([]);

  const { resources } = useResources();

  const selectionStore = useResourcesSelectionStore(
    useShallow((state) => ({
      selectedResourceIds: state.selectedResourceIds,
      selectionMode: state.selectionMode,
      isAllSelected: state.isAllSelected,
      selectionCount: state.selectionCount,
      toggleSelectionMode: state.toggleSelectionMode,
      toggleSelectAll: state.toggleSelectAll,
    })),
  );

  useEffect(() => {
    resourceIdsRef.current = resources.map((r) => r.resourceId);
  }, [resources]);

  return {
    ...selectionStore,
    toggleSelectAll: () => {
      if (selectionStore.isAllSelected) selectionStore.toggleSelectAll([]);
      else selectionStore.toggleSelectAll(resourceIdsRef.current);
    },
  };
};

export default useResourceSelection;
