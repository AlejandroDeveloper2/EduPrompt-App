import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { Tag } from "../../types";

import { useAnimatedCard } from "@/shared/hooks/animations";
import { useResponsive, useTranslations } from "@/shared/hooks/core";
import { useTagsSelectionStore } from "../../store";

const useTagCardLogic = (data: Tag) => {
  const size = useResponsive();
  const { selectionMode, selectedTagIds, toggleSelection } =
    useTagsSelectionStore(
      useShallow((state) => ({
        selectedTagIds: state.selectedTagIds,
        toggleSelection: state.toggleSelection,
        selectionMode: state.selectionMode,
      })),
    );

  const isSelected: boolean = useMemo(
    () => selectedTagIds.has(data.tagId),
    [data.tagId, selectedTagIds],
  );
  const animatedCardStyle = useAnimatedCard(isSelected);
  const { t } = useTranslations();

  return {
    size,
    isSelected,
    animatedCardStyle,
    toggleSelection,
    selectionMode,
    t,
  };
};

export default useTagCardLogic;
