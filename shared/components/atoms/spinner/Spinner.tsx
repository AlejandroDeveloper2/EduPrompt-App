import { View } from "react-native";
import Animated from "react-native-reanimated";

import useResponsive from "@/shared/hooks/core/useResponsive";

import { dynamicStyles } from "./Spinner.style";

interface SpinnerProps {
  color: string;
  animatedCircleStyles: {
    transform: {
      scale: number;
    }[];
  }[];
}

const Spinner = ({ color, animatedCircleStyles }: SpinnerProps) => {
  const size = useResponsive();

  const spinnerStyle = dynamicStyles(size, color);

  const [animatedCircleStyle1, animatedCircleStyle2, animatedCircleStyle3] =
    animatedCircleStyles;

  return (
    <View style={spinnerStyle.Box}>
      <Animated.View style={[spinnerStyle.Circle, animatedCircleStyle1]} />
      <View style={spinnerStyle.Row}>
        <Animated.View style={[spinnerStyle.Circle, animatedCircleStyle2]} />
        <Animated.View style={[spinnerStyle.Circle, animatedCircleStyle3]} />
      </View>
    </View>
  );
};

export default Spinner;
