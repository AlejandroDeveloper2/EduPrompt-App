import { Ionicons } from "@expo/vector-icons";
import { ReactNode, useMemo } from "react";
import { Pressable, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

import { ButtonVariantType, ButtonWidthType } from "@/core/types";

import { FontIconSizes } from "../../../styles";

import { getButtonColorLabel } from "../../../helpers";
import {
  useAnimatedButton,
  useAnimatedSpinner,
} from "../../../hooks/animations";
import { useScreenDimensionsStore } from "../../../hooks/store";

import { Ionicon, Spinner, Typography } from "../../atoms";

import { dynamicStyles } from "./Button.style";

interface BaseButtonProps {
  children: ReactNode[] | ReactNode;
  variant: ButtonVariantType;
  width: ButtonWidthType;
  style?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
  loadingMessage?: string;
  onPress: () => void;
}

interface ButtonProps extends Omit<BaseButtonProps, "children"> {
  label?: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const BaseButton = ({
  children,
  variant,
  disabled,
  loading,
  loadingMessage,
  width,
  style,
  onPress,
}: BaseButtonProps) => {
  const size = useScreenDimensionsStore();
  const { animatedBackground, onPressIn, onPressOut } = useAnimatedButton(
    variant,
    disabled,
  );
  const { animatedCircleStyles } = useAnimatedSpinner();

  const labelColor = useMemo(() => getButtonColorLabel(variant), [variant]);
  const styles = useMemo(() => dynamicStyles({ width, size }), [width, size]);

  return (
    <AnimatedPressable
      style={[styles.Button, animatedBackground, style]}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={loading ? true : disabled}
    >
      {loading === true && loadingMessage ? (
        <>
          <Spinner
            color={labelColor}
            animatedCircleStyles={animatedCircleStyles}
          />
          <Typography
            text={loadingMessage}
            weight="bold"
            type="button"
            textAlign="center"
            color={labelColor}
            width="auto"
          />
        </>
      ) : loading ? (
        <Spinner
          color={labelColor}
          animatedCircleStyles={animatedCircleStyles}
        />
      ) : (
        children
      )}
    </AnimatedPressable>
  );
};

const Button = ({ label, icon, ...props }: ButtonProps) => {
  const size = useScreenDimensionsStore();

  const labelColor = useMemo(
    () => getButtonColorLabel(props.variant, props.disabled),
    [props.disabled, props.variant],
  );

  return (
    <BaseButton {...props}>
      <Ionicon
        name={icon}
        size={FontIconSizes[size]["button"]}
        color={labelColor}
      />
      {label && (
        <Typography
          text={label}
          weight="bold"
          type="button"
          textAlign="center"
          color={labelColor}
          width="auto"
        />
      )}
    </BaseButton>
  );
};

export default Button;
