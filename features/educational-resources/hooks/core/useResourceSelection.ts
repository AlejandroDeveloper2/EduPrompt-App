import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";

import { PaginatedResponse } from "@/core/types";
import { EducationalResource } from "../../types";

import { useResourcesSelectionStore } from "../../store";

const useResourceSelection = () => {
  const resourceIdsRef = useRef<string[]>([]);

  const queryClient = useQueryClient();

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
    const cachedResources = queryClient.getQueryData<
      PaginatedResponse<EducationalResource>
    >(["resources"]);
    if (cachedResources) {
      resourceIdsRef.current = cachedResources.records.map((r) => r.resourceId);
    }
  }, [queryClient]);

  return {
    ...selectionStore,
    toggleSelectAll: () => {
      if (selectionStore.isAllSelected) selectionStore.toggleSelectAll([]);
      else selectionStore.toggleSelectAll(resourceIdsRef.current);
    },
  };
};

export default useResourceSelection;
