import { View } from "react-native";

import { PreviewResourceList } from "@/components/organims";

import { GlobalStyles } from "@/styles/GlobalStyles.style";

export default function ResourcesScreen() {
  return (
    <View style={GlobalStyles.RootContainer}>
      <View style={GlobalStyles.PageContent}>
        <PreviewResourceList />
      </View>
    </View>
  );
}
