import { View } from "react-native";

import { PromptFiltersProvider } from "@/features/prompts/context";

import { PromptCardList } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const PromptsTemplate = () => {
  return (
    <PromptFiltersProvider>
      <View style={GlobalStyles.RootContainer}>
        <PromptCardList />
      </View>
    </PromptFiltersProvider>
  );
};

export default PromptsTemplate;
