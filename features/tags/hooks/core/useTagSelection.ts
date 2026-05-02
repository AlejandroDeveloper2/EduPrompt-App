import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";

import { PaginatedResponse } from "@/core/types";
import { Tag } from "../../types";

import { useTagsSelectionStore } from "../../store";

const useTagSelection = () => {
  const tagIdsRef = useRef<string[]>([]);

  const queryClient = useQueryClient();

  const selectionStore = useTagsSelectionStore(
    useShallow((state) => ({
      selectedTagIds: state.selectedTagIds,
      selectionMode: state.selectionMode,
      isAllSelected: state.isAllSelected,
      selectionCount: state.selectionCount,
      toggleSelectionMode: state.toggleSelectionMode,
      toggleSelectAll: state.toggleSelectAll,
    })),
  );

  useEffect(() => {
    const cachedTags = queryClient.getQueryData<PaginatedResponse<Tag>>([
      "tags",
    ]);
    if (cachedTags) {
      tagIdsRef.current = cachedTags.records.map((t) => t.tagId);
    }
  }, [queryClient]);

  return {
    ...selectionStore,
    toggleSelectAll: () => {
      if (selectionStore.isAllSelected) selectionStore.toggleSelectAll([]);
      else selectionStore.toggleSelectAll(tagIdsRef.current);
    },
  };
};
export default useTagSelection;
