import { useMemo } from "react";
import { DimensionValue, View } from "react-native";
import Animated from "react-native-reanimated";

import { useScreenDimensionsStore } from "../../../hooks/store";

import { dynamicStyles } from "./LoaderBar.style";

interface LoaderBarProps {
  animatedProgressStyle: { width: DimensionValue };
}

const LoaderBar = ({ animatedProgressStyle }: LoaderBarProps) => {
  const size = useScreenDimensionsStore();
  const styles = useMemo(() => dynamicStyles(size), [size]);

  return (
    <View style={styles.BarTrack}>
      <Animated.View
        style={[styles.BarProgressIndicator, animatedProgressStyle]}
      ></Animated.View>
    </View>
  );
};

export default LoaderBar;
