import { View } from "react-native";

import { PreviewResourceList } from "@/components/organims";

import { GlobalStyles } from "@/styles/GlobalStyles.style";

const MyResourcesTemplate = () => {
  return (
    <View style={GlobalStyles.RootContainer}>
      <View style={GlobalStyles.PageContent}>
        <PreviewResourceList />
      </View>
    </View>
  );
};

export default MyResourcesTemplate;
