import { View } from "react-native";

import { Button, Input, InputProps } from "../../molecules";

import { PromptInputStyle } from "./PromptInput.style";

interface PromptInputProps<T> extends Omit<InputProps<T>, "textArea"> {
  onSavePrompt?: () => void;
  onSearchPrompt?: () => void;
}

function PromptInput<T>({
  onSavePrompt,
  onSearchPrompt,
  ...props
}: PromptInputProps<T>) {
  return (
    <Input {...props} textArea>
      <View style={PromptInputStyle.OptionList}>
        {onSavePrompt && (
          <Button
            icon="add-outline"
            variant="neutral"
            width="auto"
            onPress={onSavePrompt}
          />
        )}
        {onSearchPrompt && (
          <Button
            icon="search-outline"
            variant="neutral"
            width="auto"
            onPress={onSearchPrompt}
          />
        )}
      </View>
    </Input>
  );
}

export default PromptInput;
