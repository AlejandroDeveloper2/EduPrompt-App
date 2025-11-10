import { useMemo } from "react";
import { View } from "react-native";

import { IaGeneration } from "@/features/resource-generation/types";

import { AppColors } from "@/shared/styles";

import { useGenerationsStore } from "@/features/resource-generation/hooks/store";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { Ionicon, Typography } from "@/shared/components/atoms";
import { ProgressBar } from "@/shared/components/molecules";

import { GenerationCardStyle } from "./GenerationCard.style";

interface GenerationCardProps {
  data: IaGeneration;
}

const GenerationCard = ({ data }: GenerationCardProps) => {
  const size = useScreenDimensionsStore();
  const { deleteIaGeneration, getIaGeneration, reinitGeneration } =
    useGenerationsStore();

  const iconSize: number = useMemo(() => (size === "laptop" ? 24 : 20), [size]);
  const generationProgress = useMemo(() => {
    const completedSteps = data.steps.filter(
      (step) => step.completed === true
    ).length;
    return Math.floor((completedSteps * 100) / data.steps.length);
  }, [data.steps]);

  const generationCardStyle = GenerationCardStyle(size);

  return (
    <View style={generationCardStyle.CardContainer}>
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
          <Ionicon
            name="trash-bin-outline"
            color={AppColors.neutral[1000]}
            size={iconSize}
            onPress={() => deleteIaGeneration(data.generationId)}
          />
          <Ionicon
            name="reload-outline"
            color={AppColors.neutral[1000]}
            size={iconSize}
            onPress={() => reinitGeneration(data.generationId)}
          />
          <Ionicon
            name="play-forward-outline"
            color={AppColors.neutral[1000]}
            size={iconSize}
            onPress={() => getIaGeneration(data.generationId)}
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
    </View>
  );
};

export default GenerationCard;
