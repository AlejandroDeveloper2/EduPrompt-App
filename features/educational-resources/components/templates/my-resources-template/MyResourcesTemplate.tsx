import { View } from "react-native";

import {
  useResourceListUI,
  useResourceSelection,
} from "@/features/educational-resources/hooks/core";

import { SelectionOptionsBar } from "@/shared/components/organims";
import { PreviewResourceList } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const MyResourcesTemplate = () => {
  const selectionLogic = useResourceSelection();
  const { actions } = useResourceListUI();

  return (
    <View style={GlobalStyles.RootContainer}>
      <PreviewResourceList />
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

export default MyResourcesTemplate;
