import { DimensionValue, View } from "react-native";
import Animated from "react-native-reanimated";

import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { LoaderBarStyle } from "./LoaderBar.style";

interface LoaderBarProps {
  animatedProgressStyle: { width: DimensionValue };
}

const LoaderBar = ({ animatedProgressStyle }: LoaderBarProps) => {
  const size = useScreenDimensionsStore();

  const loaderBarStyle = LoaderBarStyle(size);

  return (
    <View style={loaderBarStyle.BarTrack}>
      <Animated.View
        style={[loaderBarStyle.BarProgressIndicator, animatedProgressStyle]}
      ></Animated.View>
    </View>
  );
};

export default LoaderBar;
