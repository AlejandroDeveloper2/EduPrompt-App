import { useState } from "react";
import { View } from "react-native";

import { Tab } from "@/core/types";
import { NotificationListComponentMap, NotificationListId } from "./types";

import { Spacing } from "@/shared/styles";

import { LIST_TABS } from "./constants";

import {
  useNotificationListUI,
  useNotificationSelection,
} from "@/features/notifications/hooks/core";

import { Tabulator } from "@/shared/components/molecules";
import { SelectionOptionsBar } from "@/shared/components/organims";
import { NotificationList, SystemNotificationsList } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const NotificationsTemplate = () => {
  const [activeListTab, setActiveListTab] = useState<Tab>(LIST_TABS()[0]);

  const { actions } = useNotificationListUI();
  const selectionLogic = useNotificationSelection();

  const NotificationsList: NotificationListComponentMap = {
    "tab-1": <NotificationList />,
    "tab-2": <SystemNotificationsList />,
  };

  return (
    <View style={GlobalStyles.RootContainer}>
      <View
        style={[
          { paddingTop: Spacing.spacing_xl },
          GlobalStyles.PageDimensions,
        ]}
      >
        <Tabulator
          tabs={LIST_TABS()}
          activeTab={activeListTab}
          onSwitchTab={(tab) => {
            setActiveListTab(tab);
          }}
        />
      </View>
      {NotificationsList[activeListTab.tabId as NotificationListId]}
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

export default NotificationsTemplate;
