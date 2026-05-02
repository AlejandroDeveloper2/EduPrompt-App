import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";

import { useTagsSelectionStore } from "../../store";
import useTags from "./useTags";

const useTagSelection = () => {
  const tagIdsRef = useRef<string[]>([]);

  const { tags } = useTags();

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
    tagIdsRef.current = tags.map((t) => t.tagId);
  }, [tags]);

  return {
    ...selectionStore,
    toggleSelectAll: () => {
      if (selectionStore.isAllSelected) selectionStore.toggleSelectAll([]);
      else selectionStore.toggleSelectAll(tagIdsRef.current);
    },
  };
};
export default useTagSelection;
