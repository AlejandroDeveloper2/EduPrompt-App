import { View } from "react-native";

import { useTagListUI, useTagSelection } from "@/features/tags/hooks/core";

import { SelectionOptionsBar } from "@/shared/components/organims";
import { TagCardList } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const TagsTemplate = () => {
  const { actions } = useTagListUI();
  const selectionLogic = useTagSelection();

  return (
    <View style={GlobalStyles.RootContainer}>
      <TagCardList />
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

export default TagsTemplate;
