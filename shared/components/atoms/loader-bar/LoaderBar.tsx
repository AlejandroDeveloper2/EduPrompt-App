import { DimensionValue, View } from "react-native";
import Animated from "react-native-reanimated";

import useResponsive from "@/shared/hooks/core/useResponsive";

import { dynamicStyles } from "./LoaderBar.style";

interface LoaderBarProps {
  animatedProgressStyle: { width: DimensionValue };
}

const LoaderBar = ({ animatedProgressStyle }: LoaderBarProps) => {
  const size = useResponsive();

  const styles = dynamicStyles(size);

  return (
    <View style={styles.BarTrack}>
      <Animated.View
        style={[styles.BarProgressIndicator, animatedProgressStyle]}
      ></Animated.View>
    </View>
  );
};

export default LoaderBar;
