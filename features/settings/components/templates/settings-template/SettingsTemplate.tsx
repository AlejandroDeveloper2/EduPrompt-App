import { ScrollView, View } from "react-native";

import { UserPreferencesPanel, UserProfilePanel } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const SettingsTemplate = () => {
  return (
    <View style={GlobalStyles.RootContainer}>
      <ScrollView
        style={GlobalStyles.PageDimensions}
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
