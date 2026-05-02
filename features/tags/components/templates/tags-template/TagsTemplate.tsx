import { View } from "react-native";

import { DeleteDialogProvider } from "@/features/tags/context";

import { TagCardList } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const TagsTemplate = () => {
  return (
    <DeleteDialogProvider>
      <View style={GlobalStyles.RootContainer}>
        <TagCardList />
      </View>
    </DeleteDialogProvider>
  );
};

export default TagsTemplate;
