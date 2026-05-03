import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { IaGeneration } from "../../types";

import { useAnimatedCard } from "@/shared/hooks/animations";
import { useResponsive, useTranslations } from "@/shared/hooks/core";
import {
  useGenerationsSelectionStore,
  useResourceGenerationStore,
} from "../../store";

const useGenerationCardLogic = (data: IaGeneration) => {
  const size = useResponsive();
  const { t } = useTranslations();

  const { selectedGenerationIds, toggleSelection, selectionMode } =
    useGenerationsSelectionStore(
      useShallow(
        ({ selectedGenerationIds, toggleSelection, selectionMode }) => ({
          selectionMode,
          selectedGenerationIds,
          toggleSelection,
        }),
      ),
    );

  const getIaGeneration = useResourceGenerationStore(
    useShallow((state) => state.getIaGeneration),
  );

  const generationProgress = useMemo(() => {
    const completedSteps = data.steps.filter(
      (step) => step.completed === true,
    ).length;
    return Math.floor((completedSteps * 100) / data.steps.length);
  }, [data.steps]);

  const isSelected: boolean = useMemo(
    () => selectedGenerationIds.has(data.generationId),
    [data.generationId, selectedGenerationIds],
  );

  const animatedCardStyle = useAnimatedCard(isSelected);

  return {
    size,
    t,
    animatedCardStyle,
    toggleSelection,
    selectionMode,
    getIaGeneration,
    generationProgress,
    isSelected,
  };
};

export default useGenerationCardLogic;
