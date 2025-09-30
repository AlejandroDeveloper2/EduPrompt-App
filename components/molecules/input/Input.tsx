import { Ionicons } from "@expo/vector-icons";
import { ReactNode, useState } from "react";
import { TextInput, View } from "react-native";

import { AppColors, Spacing } from "@/styles";

import { useAnimatedInput } from "@/lib/hooks/animations";
import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { Ionicon } from "@/components/atoms";
import BaseInput, { BaseInputProps } from "./BaseInput";

import { InputStyle } from "./Input.style";

export interface InputProps<T>
  extends Omit<BaseInputProps, "children" | "animatedInputStyle"> {
  name: keyof T;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  placeholder: string;
  password?: boolean;
  children?: ReactNode | ReactNode[];
  onChange: (name: keyof T, value: string) => void;
  onClearInput: () => void;
}

function Input<T>({
  name,
  value,
  placeholder,
  password,
  children,
  onChange,
  onClearInput,
  ...props
}: InputProps<T>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const size = useScreenDimensionsStore();
  const error = props.errorMessage !== undefined;

  const { onBlur, onFocus, animatedInputStyle } = useAnimatedInput(error);

  const inputStyle = InputStyle(size);

  return (
    <BaseInput {...props} animatedInputStyle={animatedInputStyle}>
      <View style={inputStyle.Body}>
        <View
          style={{
            paddingVertical:
              size === "mobile" ? Spacing.spacing_md : Spacing.spacing_lg,
          }}
        >
          <Ionicon
            name={props.icon}
            size={size === "mobile" ? 20 : 24}
            color={AppColors.neutral[props.disabled ? 500 : 1000]}
          />
        </View>
        <TextInput
          id={name as string}
          value={value}
          secureTextEntry={password ? !showPassword : false}
          onChangeText={(e) => onChange(name, e)}
          editable={props.disabled === undefined}
          placeholder={placeholder}
          placeholderTextColor={AppColors.neutral[500]}
          style={inputStyle.Input}
          onFocus={onFocus}
          onBlur={onBlur}
          {...(props.textArea && {
            multiline: true,
            numberOfLines: 20,
            maxLength: 2000,
          })}
        />
        <View style={inputStyle.Tools}>
          {value.length > 0 && (
            <Ionicon
              name="close-outline"
              color={AppColors.neutral[700]}
              size={size === "mobile" ? 20 : 24}
              onPress={onClearInput}
            />
          )}
          {password ? (
            <Ionicon
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              color={AppColors.neutral[700]}
              size={size === "mobile" ? 20 : 24}
              onPress={() => setShowPassword(!showPassword)}
            />
          ) : null}
          {props.errorMessage && (
            <Ionicon
              name="warning-outline"
              color={AppColors.danger[400]}
              size={size === "mobile" ? 20 : 24}
            />
          )}
        </View>
      </View>
      {children}
    </BaseInput>
  );
}

export default Input;
