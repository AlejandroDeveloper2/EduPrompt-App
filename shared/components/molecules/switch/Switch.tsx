import { useMemo } from "react";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "../../../styles";

import { useAnimatedSwitch } from "../../../hooks/animations";
import { useScreenDimensionsStore } from "../../../hooks/store";

import { Typography } from "../../atoms";

import { dynamicStyles } from "./Switch.style";

interface SwitchProps {
  label?: string;
  labelDirection?: "right" | "left";
  state: "on" | "off";
  onToggleSwitch: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Switch = ({
  label,
  labelDirection = "right",
  state,
  onToggleSwitch,
}: SwitchProps) => {
  const size = useScreenDimensionsStore();
  const { animatedIndicatorStyle, animatedSwitchStyle } =
    useAnimatedSwitch(state);

  const styles = useMemo(
    () => dynamicStyles(size, labelDirection),
    [size, labelDirection],
  );

  return (
    <View style={styles.SwitchContainer}>
      <AnimatedPressable
        style={[styles.SwitchPressable, animatedSwitchStyle]}
        onPress={onToggleSwitch}
      >
        <Animated.View style={[styles.Indicator, animatedIndicatorStyle]} />
      </AnimatedPressable>
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
    </View>
  );
};

export default Switch;
