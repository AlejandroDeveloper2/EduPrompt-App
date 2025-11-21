import { useQueryClient } from "@tanstack/react-query";
import { ScrollView, View } from "react-native";

import { AssistantResponse } from "@/features/generations/types";

import { useGenerationsStore } from "@/features/generations/hooks/store";

import {
  Generating,
  GenerationCardList,
  GenerationStepView,
  IaResponseCard,
} from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const ResourceGenerationTemplate = () => {
  const { currentIaGeneration } = useGenerationsStore();
  const queryClient = useQueryClient();

  const iaGenerationResult = queryClient.getQueryData<AssistantResponse>([
    "ia_generation_result",
  ]);

  return (
    <View style={GlobalStyles.RootContainer}>
      {currentIaGeneration ? (
        <ScrollView
          style={GlobalStyles.PageDimensions}
          contentContainerStyle={GlobalStyles.PageContent}
          showsVerticalScrollIndicator={false}
        >
          {currentIaGeneration.isGenerating ? (
            <Generating />
          ) : iaGenerationResult ? (
            <IaResponseCard
              format={currentIaGeneration.data.resourceFormat}
              iaGeneratedContent={iaGenerationResult.result}
            />
          ) : (
            <GenerationStepView currentIaGeneration={currentIaGeneration} />
          )}
        </ScrollView>
      ) : (
        <GenerationCardList />
      )}
    </View>
  );
};

export default ResourceGenerationTemplate;
