import { useMemo } from "react";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { IaGeneration } from "@/features/generations/types";

import { AppColors } from "@/shared/styles";

import { useSelectionModeStore } from "@/core/store";
import { useAnimatedCard } from "@/shared/hooks/animations";
import { useResponsive, useTranslations } from "@/shared/hooks/core";
import {
  useGenerationsSelectionStore,
  useResourceGenerationStore,
} from "../../../store";

import { Checkbox, Typography } from "@/shared/components/atoms";
import { ProgressBar } from "@/shared/components/molecules";

import { useShallow } from "zustand/react/shallow";
import { dynamicStyles } from "./GenerationCard.style";

interface GenerationCardProps {
  data: IaGeneration;
  totalRecords: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const GenerationCard = ({ data, totalRecords }: GenerationCardProps) => {
  const size = useResponsive();
  const { selectedGenerationIds, toggleSelection } =
    useGenerationsSelectionStore(
      useShallow(({ selectedGenerationIds, toggleSelection }) => ({
        selectedGenerationIds,
        toggleSelection,
      })),
    );
  const selectionMode = useSelectionModeStore(
    useShallow((state) => state.selectionMode),
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
  const { t } = useTranslations();

  const styles = dynamicStyles(size);

  return (
    <AnimatedPressable
      style={[styles.CardContainer, animatedCardStyle]}
      onPress={
        !selectionMode ? () => getIaGeneration(data.generationId) : () => {}
      }
    >
      <View style={styles.CardHeader}>
        <Typography
          text={data.title}
          weight="bold"
          type="paragraph"
          textAlign="left"
          color={AppColors.neutral[1000]}
          width={220}
          icon="text-outline"
        />
        <View style={styles.CardActions}>
          <Checkbox
            checked={isSelected}
            disabled={!data.canDelete}
            onCheck={() => toggleSelection(data.generationId, totalRecords)}
          />
        </View>
      </View>
      <View style={styles.CardBody}>
        <View style={styles.CardCurrentStepTitle}>
          <Typography
            text={t(
              "generations_translations.generation_list_labels.generation_card_label",
            )}
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
