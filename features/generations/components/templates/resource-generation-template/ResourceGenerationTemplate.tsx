import { ScrollView, View } from "react-native";

import {
  useGenerationListUI,
  useGenerationSelection,
} from "@/features/generations/hooks/core";
import { useResourceGenerationStore } from "@/features/generations/store";

import { SelectionOptionsBar } from "@/shared/components/organims";
import {
  Generating,
  GenerationCardList,
  GenerationStepView,
  IaResponseCard,
} from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const ResourceGenerationTemplate = () => {
  const { actions } = useGenerationListUI();
  const selectionLogic = useGenerationSelection();

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
      {selectionLogic.selectionMode && (
        <SelectionOptionsBar
          isAllSelected={selectionLogic.isAllSelected}
          selectionMode={selectionLogic.selectionMode}
          actionsDisabled={false}
          actions={actions}
          selectionCount={selectionLogic.selectionCount}
          toggleSelectAll={selectionLogic.toggleSelectAll}
          disableSelectionMode={() => selectionLogic.toggleSelectionMode(false)}
        />
      )}
    </View>
  );
};

export default ResourceGenerationTemplate;
