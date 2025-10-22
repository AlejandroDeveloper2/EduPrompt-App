import { View } from "react-native";

import { PreviewResourceList } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const MyResourcesTemplate = () => {
  return (
    <View style={GlobalStyles.RootContainer}>
      <View style={[GlobalStyles.PageContent, GlobalStyles.PageDimensions]}>
        <PreviewResourceList />
      </View>
    </View>
  );
};

export default MyResourcesTemplate;
