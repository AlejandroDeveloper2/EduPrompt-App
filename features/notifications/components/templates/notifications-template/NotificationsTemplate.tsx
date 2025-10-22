import { useState } from "react";
import { View } from "react-native";

import { Tab } from "@/core/types";
import { NotificationListComponentMap, NotificationListId } from "./types";

import { Spacing } from "@/shared/styles";

import { LIST_TABS } from "./constants";

import { Tabulator } from "@/shared/components/molecules";
import { NotificationList, SystemNotificationsList } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const NotificationsTemplate = () => {
  const [activeListTab, setActiveListTab] = useState<Tab>(LIST_TABS[0]);

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
          tabs={LIST_TABS}
          activeTab={activeListTab}
          onSwitchTab={(tab) => {
            setActiveListTab(tab);
          }}
        />
      </View>
      {NotificationsList[activeListTab.tabId as NotificationListId]}
    </View>
  );
};

export default NotificationsTemplate;
