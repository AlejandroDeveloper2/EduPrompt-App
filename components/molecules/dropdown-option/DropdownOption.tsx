import { Pressable } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "@/styles";

import { useAnimatedNavItem as useAnimatedDropdownOption } from "@/lib/hooks/animations";
import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { Typography } from "@/components/atoms";

import { DropdownOptionStyle } from "./DropdownOption.style";

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
  const size = useScreenDimensionsStore();
  const animatedBackground = useAnimatedDropdownOption(isSelected);

  return (
    <AnimatedPressable
      onPress={() => onSelectOption(option)}
      style={[DropdownOptionStyle(size).OptionBox, animatedBackground]}
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
