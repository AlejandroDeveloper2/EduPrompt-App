import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "@/shared/styles";

import { useAnimatedNavItem } from "@/shared/hooks/animations";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { Typography } from "@/shared/components/atoms";

import { FileNavigatorStyle } from "./FileNavigator.style";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const FileNavigator = () => {
  const active1: boolean = true;
  const active2: boolean = false;

  const size = useScreenDimensionsStore();

  const animatedFirstBackground = useAnimatedNavItem(active1);
  const animatedSecondBackground = useAnimatedNavItem(active2);

  const fileNavigatorStyle = FileNavigatorStyle(size);

  return (
    <View style={fileNavigatorStyle.NavigatorContainer}>
      <AnimatedPressable
        style={[fileNavigatorStyle.NavigatorTap, animatedFirstBackground]}
        onPress={() => {}}
      >
        <Typography
          text="Mis Archivos"
          weight="regular"
          type="paragraph"
          textAlign="center"
          color={active1 ? AppColors.basic.white : AppColors.neutral[1000]}
          width="100%"
        />
      </AnimatedPressable>
      <AnimatedPressable
        style={[fileNavigatorStyle.NavigatorTap, animatedSecondBackground]}
        onPress={() => {}}
      >
        <Typography
          text="Carpeta"
          weight="regular"
          type="paragraph"
          textAlign="center"
          color={active2 ? AppColors.basic.white : AppColors.neutral[1000]}
          width="100%"
        />
      </AnimatedPressable>
    </View>
  );
};

export default FileNavigator;
