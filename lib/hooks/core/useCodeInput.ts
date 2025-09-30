import { useRef } from "react";
import { NativeSyntheticEvent, TextInputKeyPressEventData } from "react-native";

import { TextInputInstance } from "@/lib/types";

import { useAnimatedInput } from "../animations";
import { useScreenDimensionsStore } from "../store";

const useCodeInput = (
  name: string,
  value: string,
  onChange: (name: string, value: string) => void,
  errorMessage?: string
) => {
  const codeArray = [
    value.charAt(0) ?? "",
    value.charAt(1) ?? "",
    value.charAt(2) ?? "",
    value.charAt(3) ?? "",
  ];

  const size = useScreenDimensionsStore();
  const error = errorMessage !== undefined;

  const { onBlur, onFocus, animatedInputStyle } = useAnimatedInput(error);

  // refs para controlar foco entre inputs
  const inputsRef = useRef<(TextInputInstance | null)[]>([]);

  const handleChangeText = (text: string, index: number) => {
    const newCodeArray = [...codeArray];
    newCodeArray[index] = text.charAt(0) ?? "";
    const joined = newCodeArray.join("");
    onChange(name, joined);

    if (text && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace" && !codeArray[index] && index > 0) {
      const newCodeArray = [...codeArray];
      newCodeArray[index - 1] = "";
      onChange(name, newCodeArray.join(""));
      inputsRef.current[index - 1]?.focus();
    }
  };

  return {
    inputsRef,
    size,
    codeArray,
    animatedInputStyle,
    handleChangeText,
    handleKeyPress,
    onBlur,
    onFocus,
  };
};

export default useCodeInput;
