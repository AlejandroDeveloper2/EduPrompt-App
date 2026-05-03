import { ScrollView, View } from "react-native";

import { useResourceGenerationStore } from "@/features/generations/store";

import {
  Generating,
  GenerationCardList,
  GenerationStepView,
  IaResponseCard,
} from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const ResourceGenerationTemplate = () => {
  const currentIaGeneration = useResourceGenerationStore(
    (state) => state.currentIaGeneration,
  );

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
