import { ReactNode } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "../../../styles";

import { useScreenDimensionsStore } from "../../../hooks/store";

import { ErrorMessage, Typography } from "../../atoms";

import { BaseInputStyle } from "./Input.style";

export interface BaseInputProps {
  label?: string;
  animatedInputStyle: {
    borderColor: string;
    borderWidth: number;
  };
  children: ReactNode | ReactNode[];
  errorMessage?: string;
  disabled?: boolean;
  textArea?: boolean;
}

const BaseInput = ({
  label,
  children,
  errorMessage,
  disabled,
  textArea,
  animatedInputStyle,
}: BaseInputProps) => {
  const size = useScreenDimensionsStore();

  const baseInputStyle = BaseInputStyle(size, disabled, textArea);

  return (
    <View style={baseInputStyle.Container}>
      {label && (
        <Typography
          text={label}
          weight="regular"
          type="paragraph"
          textAlign="left"
          color={AppColors.neutral[1000]}
          width="auto"
        />
      )}
      <Animated.View style={[animatedInputStyle, baseInputStyle.InputBox]}>
        {children}
      </Animated.View>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </View>
  );
};

export default BaseInput;
