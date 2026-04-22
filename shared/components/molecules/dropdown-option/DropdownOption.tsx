import { Pressable } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "../../../styles";

import { useResponsive } from "@/shared/hooks/core";
import { useAnimatedNavItem as useAnimatedDropdownOption } from "../../../hooks/animations";

import { Typography } from "../../atoms";

import { dynamicStyles } from "./DropdownOption.style";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface DropdownOptionProps<T> {
  option: T;
  optionLabelKey: keyof T;
  isSelected: boolean;
  onSelectOption: (option: T) => void;
}

function DropdownOption<T>({
  option,
  optionLabelKey,
  isSelected,
  onSelectOption,
}: DropdownOptionProps<T>) {
  const size = useResponsive();
  const animatedBackground = useAnimatedDropdownOption(isSelected);

  const styles = dynamicStyles(size);

  return (
    <AnimatedPressable
      onPress={() => onSelectOption(option)}
      style={[styles.OptionBox, animatedBackground]}
    >
      <Typography
        text={option[optionLabelKey] as string}
        weight="regular"
        type="paragraph"
        textAlign="center"
        color={isSelected ? AppColors.basic.white : AppColors.neutral[1000]}
        width="auto"
      />
    </AnimatedPressable>
  );
}

export default DropdownOption;
