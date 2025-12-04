import { useEffect, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { IaGeneration } from "@/features/generations/types";

import { AppColors } from "@/shared/styles";

import { SELECTION_MODE_ACTIONS } from "@/features/generations/constants";

import { useGenerationsStore } from "@/features/generations/hooks/store";
import { useAnimatedCard } from "@/shared/hooks/animations";
import { useSelectionModeContext } from "@/shared/hooks/context";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { Checkbox, Typography } from "@/shared/components/atoms";
import { ProgressBar } from "@/shared/components/molecules";

import { GenerationCardStyle } from "./GenerationCard.style";

interface GenerationCardProps {
  data: IaGeneration;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const GenerationCard = ({ data }: GenerationCardProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const size = useScreenDimensionsStore();
  const {
    iaGenerations,
    selectedGenerations,
    deleteSelectedGenerations,
    getIaGeneration,
    reinitSelectedGenerations,
    selectGeneration,
    unselectGeneration,
  } = useGenerationsStore();
  const {
    allSelected,
    selectionMode,
    enableSelectionMode,
    disableSelectionMode,
  } = useSelectionModeContext();

  const animatedCardStyle = useAnimatedCard(isSelected);

  const generationProgress = useMemo(() => {
    const completedSteps = data.steps.filter(
      (step) => step.completed === true
    ).length;
    return Math.floor((completedSteps * 100) / data.steps.length);
  }, [data.steps]);

  useEffect(() => {
    if (!selectionMode) setIsSelected(false);
  }, [selectionMode]);

  useEffect(() => {
    if (allSelected && selectedGenerations.length === iaGenerations.length) {
      setIsSelected(true);
    } else if (
      !allSelected &&
      selectedGenerations.length === iaGenerations.length
    ) {
      setIsSelected(false);
    }
  }, [allSelected, selectedGenerations.length, iaGenerations.length]);

  const handleSelectElement = (): void => {
    setIsSelected((prev) => !prev);
    if (!isSelected) {
      selectGeneration(data);
      enableSelectionMode(
        SELECTION_MODE_ACTIONS(
          () => deleteSelectedGenerations(disableSelectionMode),
          () => reinitSelectedGenerations(disableSelectionMode)
        )
      );
    } else {
      unselectGeneration(data.generationId);
    }
  };

  const generationCardStyle = GenerationCardStyle(size);

  return (
    <AnimatedPressable
      style={[generationCardStyle.CardContainer, animatedCardStyle]}
      onPress={
        !selectionMode ? () => getIaGeneration(data.generationId) : () => {}
      }
    >
      <View style={generationCardStyle.CardHeader}>
        <Typography
          text={data.title}
          weight="bold"
          type="paragraph"
          textAlign="left"
          color={AppColors.neutral[1000]}
          width={220}
          icon="text-outline"
        />
        <View style={generationCardStyle.CardActions}>
          <Checkbox checked={isSelected} onCheck={handleSelectElement} />
        </View>
      </View>
      <View style={generationCardStyle.CardBody}>
        <View style={generationCardStyle.CardCurrentStepTitle}>
          <Typography
            text="Paso actual:"
            weight="bold"
            type="caption"
            textAlign="left"
            color={AppColors.neutral[1000]}
            width="auto"
            icon="battery-charging-outline"
          />
          <Typography
            text={data.currentStep.title}
            weight="regular"
            type="caption"
            textAlign="left"
            color={AppColors.neutral[1000]}
            width="auto"
          />
        </View>
        <ProgressBar
          progressConfig={{
            mode: "progress-counter",
            limit: data.steps.length,
          }}
          progressPercentage={generationProgress}
        />
      </View>
    </AnimatedPressable>
  );
};

export default GenerationCard;
