import { ScrollView, View } from "react-native";

import { useEmitUserProfileUpdated } from "@/features/settings/hooks/core";

import { UserPreferencesPanel, UserProfilePanel } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const SettingsTemplate = () => {
  useEmitUserProfileUpdated();
  return (
    <View style={GlobalStyles.RootContainer}>
      <ScrollView
        style={{ width: "90%" }}
        contentContainerStyle={GlobalStyles.PageContent}
        showsVerticalScrollIndicator={false}
      >
        <UserPreferencesPanel />
        <UserProfilePanel />
      </ScrollView>
    </View>
  );
};

export default SettingsTemplate;
