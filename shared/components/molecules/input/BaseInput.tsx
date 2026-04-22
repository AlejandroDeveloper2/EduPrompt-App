import { ReactNode } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "../../../styles";

import { useResponsive } from "@/shared/hooks/core";

import { ErrorMessage, Typography } from "../../atoms";

import { baseInputStyle } from "./Input.style";

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
  const size = useResponsive();

  const styles = baseInputStyle(size, disabled, textArea);

  return (
    <View style={styles.Container}>
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
      <Animated.View style={[animatedInputStyle, styles.InputBox]}>
        {children}
      </Animated.View>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </View>
  );
};

export default BaseInput;
