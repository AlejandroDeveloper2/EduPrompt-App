import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import { AppColors } from "@/styles";

import { useAnimatedInput } from "@/lib/hooks/animations";
import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { Ionicon, Typography } from "@/components/atoms";
import BaseInput, { BaseInputProps } from "../input/BaseInput";

import { DropdownStyle } from "./Dropdown.style";

interface DropdownProps<T, D>
  extends Omit<BaseInputProps, "children" | "textArea" | "animatedInputStyle"> {
  name: keyof T;
  icon: keyof typeof Ionicons.glyphMap;
  placeholder: string;
  selectedOption: D | null;
  optionValueKey: keyof D;
  displayDropdownOptions: () => void;
  clearSelectedOption: () => void;
}

function Dropdown<T, D>({
  name,
  icon,
  placeholder,
  selectedOption,
  optionValueKey,
  displayDropdownOptions,
  clearSelectedOption,
  ...props
}: DropdownProps<T, D>) {
  const error = props.errorMessage !== undefined;

  const size = useScreenDimensionsStore();
  const { onBlur, onFocus, animatedInputStyle } = useAnimatedInput(error);

  const dropdownStyle = DropdownStyle(size);

  return (
    <BaseInput {...props} animatedInputStyle={animatedInputStyle}>
      <View style={dropdownStyle.Body}>
        <Ionicon
          name={icon}
          size={size === "mobile" ? 20 : 24}
          color={AppColors.neutral[props.disabled ? 500 : 1000]}
        />
        <Pressable
          onPressIn={onFocus}
          onPressOut={onBlur}
          style={dropdownStyle.Option}
          onPress={displayDropdownOptions}
        >
          <Typography
            text={
              selectedOption
                ? (selectedOption[optionValueKey] as string)
                : placeholder
            }
            weight="regular"
            type="paragraph"
            textAlign="left"
            color={AppColors.neutral[selectedOption ? 1000 : 500]}
            width="auto"
          />
        </Pressable>
        <View style={dropdownStyle.Tools}>
          <Ionicon
            name="chevron-forward-outline"
            color={AppColors.neutral[700]}
            size={size === "mobile" ? 20 : 24}
            onPress={displayDropdownOptions}
            onPressIn={onFocus}
            onPressOut={onBlur}
          />
          {selectedOption && (
            <Ionicon
              name="close-outline"
              color={AppColors.neutral[700]}
              size={size === "mobile" ? 20 : 24}
              onPress={clearSelectedOption}
            />
          )}
          {props.errorMessage && (
            <Ionicon
              name="warning-outline"
              color={AppColors.danger[400]}
              size={size === "mobile" ? 20 : 24}
            />
          )}
        </View>
      </View>
    </BaseInput>
  );
}

export default Dropdown;
