import { View } from "react-native";

import { TagCardList } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const TagsTemplate = () => {
  return (
    <View style={GlobalStyles.RootContainer}>
      <TagCardList />
    </View>
  );
};

export default TagsTemplate;
