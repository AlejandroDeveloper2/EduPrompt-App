import { View } from "react-native";

import { PromptCardList } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const PromptsTemplate = () => {
  return (
    <View style={GlobalStyles.RootContainer}>
      <PromptCardList />
    </View>
  );
};

export default PromptsTemplate;
