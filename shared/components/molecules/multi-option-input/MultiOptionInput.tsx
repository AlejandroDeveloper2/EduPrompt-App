import { ReactNode } from "react";
import { Pressable, useWindowDimensions, View } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "@/shared/styles";

import { MultiOptionInputProvider } from "@/shared/context";

import { useAnimatedNavItem } from "@/shared/hooks/animations";
import { useMultiOptionContext } from "@/shared/hooks/context";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { getIndicatorPanelGrid } from "@/shared/utils";

import { ErrorMessage, Typography } from "../../atoms";

import { MultiOptionInputStyle } from "./MultiOptionInput.style";

interface MultiOptionInputProps<T, K> {
  label: string;
  name: keyof T;
  errorMessage?: string;
  multiSelect?: boolean;
  value: K;
  children: ReactNode | ReactNode[];
  onChange: (name: keyof T, value: K) => void;
}

interface OptionProps {
  label: string;
  optionValue: unknown;
  isSelected: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Option = ({ label, optionValue, isSelected }: OptionProps) => {
  const size = useScreenDimensionsStore();
  const { width } = useWindowDimensions();

  const { onSelectOption } = useMultiOptionContext();
  const animatedStyled = useAnimatedNavItem(isSelected);

  const { firstWidth } = getIndicatorPanelGrid(size, width);

  const { OptionContainer } = MultiOptionInputStyle(size);

  return (
    <AnimatedPressable
      style={[
        OptionContainer,
        animatedStyled,
        {
          width: firstWidth,
        },
      ]}
      onPress={() => onSelectOption(optionValue)}
    >
      <Typography
        text={label}
        weight="medium"
        type="paragraph"
        textAlign="center"
        color={isSelected ? AppColors.basic.white : AppColors.neutral[1000]}
        width="auto"
      />
    </AnimatedPressable>
  );
};

function MultiOptionInput<T, K>({
  label,
  errorMessage,
  children,
  ...props
}: MultiOptionInputProps<T, K>) {
  const size = useScreenDimensionsStore();

  const { InputContainer, OptionsGrid } = MultiOptionInputStyle(size);

  return (
    <MultiOptionInputProvider<T, K> {...props}>
      <View style={InputContainer}>
        <Typography
          text={label}
          weight="regular"
          type="paragraph"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="auto"
        />
        <View style={OptionsGrid}>{children}</View>
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </View>
    </MultiOptionInputProvider>
  );
}

MultiOptionInput.Option = Option;

export default MultiOptionInput;
