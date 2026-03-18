import { ScrollView, View } from "react-native";

import { useEventbusValue } from "@/shared/hooks/events";

import {
  SubscriptionManagePanel,
  UserPreferencesPanel,
  UserProfilePanel,
} from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const SettingsTemplate = () => {
  const subscription = useEventbusValue(
    "marketplace.subscription.updated",
    null,
  );

  return (
    <View style={GlobalStyles.RootContainer}>
      <ScrollView
        style={GlobalStyles.PageDimensions}
        contentContainerStyle={GlobalStyles.PageContent}
        showsVerticalScrollIndicator={false}
      >
        <UserPreferencesPanel />
        {subscription && <SubscriptionManagePanel />}
        <UserProfilePanel />
      </ScrollView>
    </View>
  );
};

export default SettingsTemplate;
