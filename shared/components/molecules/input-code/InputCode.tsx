import { TextInput, View } from "react-native";
import Animated from "react-native-reanimated";

import { CodeValue, TextInputInstance } from "@/core/types";

import { useCodeInput } from "../../../hooks/core";

import { AppColors } from "../../../styles";

import { ErrorMessage, Typography } from "../../atoms";

import { InputCodeStyle } from "./InputCode.style";

interface InputCodeProps<T> {
  label: string;
  name: keyof T;
  value: string;
  placeholders: CodeValue;
  errorMessage?: string;
  disabled?: boolean;
  onChange: (name: keyof T, value: string) => void;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function InputCode<T>({
  name,
  value,
  label,
  disabled,
  placeholders,
  errorMessage,
  onChange,
}: InputCodeProps<T>) {
  const {
    inputsRef,
    size,
    codeArray,
    animatedInputStyle,
    handleChangeText,
    handleKeyPress,
    onBlur,
    onFocus,
  } = useCodeInput(
    name as string,
    value,
    onChange as (name: string, value: string) => void,
    errorMessage
  );

  const inputCodeStyle = InputCodeStyle(size, disabled);

  return (
    <View style={inputCodeStyle.Container}>
      <Typography
        text={label}
        weight="regular"
        type="paragraph"
        textAlign="left"
        color={AppColors.neutral[1000]}
        width="auto"
      />
      <View style={inputCodeStyle.InputBoxList}>
        {codeArray.map((char, index) => (
          <AnimatedTextInput
            key={`code-input-${index}`}
            value={char}
            onChangeText={(e) => handleChangeText(e, index)}
            editable={!disabled}
            placeholder={
              placeholders[`character${index + 1}` as keyof CodeValue]
            }
            placeholderTextColor={AppColors.neutral[500]}
            style={[inputCodeStyle.CodeInputField, animatedInputStyle]}
            onFocus={onFocus}
            onBlur={onBlur}
            maxLength={1}
            ref={(ref) => {
              // Forzamos el cast: AnimatedTextInput en runtime sí es un TextInput
              inputsRef.current[index] = ref as unknown as TextInputInstance;
            }}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="default"
            returnKeyType="done"
          />
        ))}
      </View>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </View>
  );
}

export default InputCode;
