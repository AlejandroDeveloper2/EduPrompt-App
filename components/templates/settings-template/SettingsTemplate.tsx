import { ScrollView, View } from "react-native";

import { UserPreferencesPanel } from "@/components/organims";

import { GlobalStyles } from "@/styles/GlobalStyles.style";

const SettingsTemplate = () => {
  return (
    <View style={GlobalStyles.RootContainer}>
      <ScrollView
        contentContainerStyle={GlobalStyles.PageContent}
        showsVerticalScrollIndicator={false}
      >
        <UserPreferencesPanel />
      </ScrollView>
    </View>
  );
};

export default SettingsTemplate;
