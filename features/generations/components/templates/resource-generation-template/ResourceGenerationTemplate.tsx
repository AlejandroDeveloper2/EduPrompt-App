import { ScrollView, View } from "react-native";

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
          ) : currentIaGeneration.result ? (
            <IaResponseCard
              format={currentIaGeneration.data.resourceFormat}
              iaGeneratedContent={currentIaGeneration.result.result}
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
