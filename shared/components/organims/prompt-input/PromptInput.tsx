import { View } from "react-native";

import { Button, Input, InputProps } from "../../molecules";

import { PromptInputStyle } from "./PromptInput.style";

interface PromptInputProps<T> extends Omit<InputProps<T>, "textArea"> {
  onSavePrompt: () => void;
  onSearchPrompt: () => void;
  onGeneratePrompt: () => void;
}

function PromptInput<T>({
  onSavePrompt,
  onSearchPrompt,
  onGeneratePrompt,
  ...props
}: PromptInputProps<T>) {
  return (
    <Input {...props} textArea>
      <View style={PromptInputStyle.OptionList}>
        <Button
          icon="add-outline"
          variant="neutral"
          width="auto"
          onPress={onSavePrompt}
        />
        <Button
          icon="search-outline"
          variant="neutral"
          width="auto"
          onPress={onSearchPrompt}
        />
        <Button
          icon="star-outline"
          variant="neutral"
          width="auto"
          onPress={onGeneratePrompt}
        />
      </View>
    </Input>
  );
}

export default PromptInput;
