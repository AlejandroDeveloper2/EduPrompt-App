import { View } from "react-native";

import { DeleteDialogProvider } from "@/features/educational-resources/context";

import { PreviewResourceList } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const MyResourcesTemplate = () => {
  return (
    <DeleteDialogProvider>
      <View style={GlobalStyles.RootContainer}>
        <PreviewResourceList />
      </View>
    </DeleteDialogProvider>
  );
};

export default MyResourcesTemplate;
