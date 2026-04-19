import { Ionicons } from "@expo/vector-icons";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { ReactNode, useMemo, useState } from "react";
import { TextInput, View } from "react-native";

import { AppColors, Spacing } from "../../../styles";

import { useAnimatedInput } from "../../../hooks/animations";
import { useScreenDimensionsStore } from "../../../hooks/store";

import { Ionicon } from "../../atoms";
import BaseInput, { BaseInputProps } from "./BaseInput";

import { dynamicStyles } from "./Input.style";

export interface InputProps<T> extends Omit<
  BaseInputProps,
  "children" | "animatedInputStyle"
> {
  name: keyof T;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  placeholder: string;
  password?: boolean;
  children?: ReactNode | ReactNode[];
  isInPopUp?: boolean;
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
  isInPopUp,
  ...props
}: InputProps<T>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const size = useScreenDimensionsStore();

  const { onBlur, onFocus, animatedInputStyle } = useAnimatedInput(
    props.errorMessage !== undefined,
  );

  const styles = useMemo(() => dynamicStyles(size), [size]);

  return (
    <BaseInput {...props} animatedInputStyle={animatedInputStyle}>
      <View style={styles.Body}>
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
        {isInPopUp ? (
          <BottomSheetTextInput
            id={name as string}
            value={value}
            secureTextEntry={password ? !showPassword : false}
            onChangeText={(e) => onChange(name, e)}
            editable={props.disabled === undefined}
            placeholder={placeholder}
            placeholderTextColor={AppColors.neutral[500]}
            style={styles.Input}
            onFocus={onFocus}
            onBlur={onBlur}
            {...(props.textArea && {
              multiline: true,
              numberOfLines: 20,
              maxLength: 2000,
            })}
          />
        ) : (
          <TextInput
            id={name as string}
            value={value}
            secureTextEntry={password ? !showPassword : false}
            onChangeText={(e) => onChange(name, e)}
            editable={props.disabled === undefined}
            placeholder={placeholder}
            placeholderTextColor={AppColors.neutral[500]}
            style={styles.Input}
            onFocus={onFocus}
            onBlur={onBlur}
            {...(props.textArea && {
              multiline: true,
              numberOfLines: 20,
              maxLength: 2000,
            })}
          />
        )}

        <View style={styles.Tools}>
          {value.length > 0 && !props.disabled && (
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
