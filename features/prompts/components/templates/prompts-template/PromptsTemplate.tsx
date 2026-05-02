import { View } from "react-native";

import { DeleteDialogProvider } from "@/features/prompts/context";

import { PromptCardList } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const PromptsTemplate = () => {
  return (
    <DeleteDialogProvider>
      <View style={GlobalStyles.RootContainer}>
        <PromptCardList />
      </View>
    </DeleteDialogProvider>
  );
};

export default PromptsTemplate;
