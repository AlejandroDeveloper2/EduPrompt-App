import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "../../../styles";

import { useAnimatedSwitch } from "../../../hooks/animations";
import { useScreenDimensionsStore } from "../../../hooks/store";

import { Typography } from "../../atoms";

import { SwitchStyle } from "./Switch.style";

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

  const switchStyle = SwitchStyle(size, labelDirection);
  return (
    <View style={switchStyle.SwitchContainer}>
      <AnimatedPressable
        style={[switchStyle.SwitchPressable, animatedSwitchStyle]}
        onPress={onToggleSwitch}
      >
        <Animated.View
          style={[switchStyle.Indicator, animatedIndicatorStyle]}
        />
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
