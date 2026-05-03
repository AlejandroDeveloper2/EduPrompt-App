import { View } from "react-native";

import {
  usePromptListUI,
  usePromptSelection,
} from "@/features/prompts/hooks/core";

import { SelectionOptionsBar } from "@/shared/components/organims";
import { PromptCardList } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const PromptsTemplate = () => {
  const { actions } = usePromptListUI();
  const selectionLogic = usePromptSelection();

  return (
    <View style={GlobalStyles.RootContainer}>
      <PromptCardList />

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

export default PromptsTemplate;
