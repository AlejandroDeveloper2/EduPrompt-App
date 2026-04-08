import { View } from "react-native";

import { ResourcesFiltersProvider } from "@/features/educational-resources/context";

import { PreviewResourceList } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const MyResourcesTemplate = () => {
  return (
    <ResourcesFiltersProvider>
      <View style={GlobalStyles.RootContainer}>
        <PreviewResourceList />
      </View>
    </ResourcesFiltersProvider>
  );
};

export default MyResourcesTemplate;
