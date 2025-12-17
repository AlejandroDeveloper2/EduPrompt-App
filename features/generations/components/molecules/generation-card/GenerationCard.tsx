import { useMemo } from "react";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { IaGeneration } from "@/features/generations/types";

import { AppColors } from "@/shared/styles";

import {
  useGenerationsSelectionStore,
  useGenerationsStore,
} from "@/features/generations/hooks/store";
import { useAnimatedCard } from "@/shared/hooks/animations";
import {
  useScreenDimensionsStore,
  useSelectionModeStore,
} from "@/shared/hooks/store";

import { Checkbox, Typography } from "@/shared/components/atoms";
import { ProgressBar } from "@/shared/components/molecules";

import { GenerationCardStyle } from "./GenerationCard.style";

interface GenerationCardProps {
  data: IaGeneration;
  totalRecords: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const GenerationCard = ({ data, totalRecords }: GenerationCardProps) => {
  const size = useScreenDimensionsStore();
  const { selectedGenerationIds, toggleSelection } =
    useGenerationsSelectionStore();
  const { selectionMode } = useSelectionModeStore();
  const { getIaGeneration } = useGenerationsStore();

  const generationProgress = useMemo(() => {
    const completedSteps = data.steps.filter(
      (step) => step.completed === true
    ).length;
    return Math.floor((completedSteps * 100) / data.steps.length);
  }, [data.steps]);

  const isSelected: boolean = useMemo(
    () => selectedGenerationIds.has(data.generationId),
    [data.generationId, selectedGenerationIds]
  );

  const animatedCardStyle = useAnimatedCard(isSelected);

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
          <Checkbox
            checked={isSelected}
            disabled={!data.canDelete}
            onCheck={() => toggleSelection(data.generationId, totalRecords)}
          />
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
