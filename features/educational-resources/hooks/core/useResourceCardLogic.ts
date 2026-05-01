import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { EducationalResource } from "../../types";

import { useSelectionModeStore } from "@/core/store";
import { useAnimatedCard } from "@/shared/hooks/animations";
import { useResponsive, useTranslations } from "@/shared/hooks/core";
import { useResourcesSelectionStore } from "../../store";
import useResourceTags from "./useResourceTags";

const useResourceCardLogic = (resourceData: EducationalResource) => {
  const size = useResponsive();
  const { selectedResourceIds, toggleSelection } = useResourcesSelectionStore(
    useShallow(({ selectedResourceIds, toggleSelection }) => ({
      selectedResourceIds,
      toggleSelection,
    })),
  );
  const selectionMode = useSelectionModeStore(
    useShallow((state) => state.selectionMode),
  );
  const { tags } = useResourceTags();

  const isSelected: boolean = useMemo(
    () => selectedResourceIds.has(resourceData.resourceId),
    [resourceData.resourceId, selectedResourceIds],
  );
  const animatedCardStyle = useAnimatedCard(isSelected);
  const { t } = useTranslations();

  return {
    size,
    isSelected,
    animatedCardStyle,
    selectionMode,
    tags,
    t,
    toggleSelection,
  };
};

export default useResourceCardLogic;
