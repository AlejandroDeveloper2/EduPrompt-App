import { ScrollView, View } from "react-native";

import { UserPreferencesPanel, UserProfilePanel } from "@/components/organims";

import { GlobalStyles } from "@/styles/GlobalStyles.style";

const SettingsTemplate = () => {
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
