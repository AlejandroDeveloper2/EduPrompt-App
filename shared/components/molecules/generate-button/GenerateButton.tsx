import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "../../../styles";

import { useAnimatedNavItem } from "../../../hooks/animations";
import { useScreenDimensionsStore } from "../../../hooks/store";

import { Ionicon, Typography } from "../../atoms";

import { GenerateButtonStyle } from "./GenerateButton.style";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface GenerateButtonProps {
  active: boolean;
  onPress: () => void;
}

const GenerateButton = ({ active, onPress }: GenerateButtonProps) => {
  const size = useScreenDimensionsStore();
  const animatedBackgroundStyle = useAnimatedNavItem(active);

  const generateButtonStyle = GenerateButtonStyle(size);

  return (
    <View style={generateButtonStyle.Container}>
      <AnimatedPressable
        onPress={onPress}
        style={[generateButtonStyle.NavItemPressable, animatedBackgroundStyle]}
      >
        <Ionicon
          name="bulb-outline"
          size={size === "mobile" ? 36 : 40}
          color={active ? AppColors.basic.white : AppColors.neutral[1000]}
        />
      </AnimatedPressable>
      <Typography
        text="Generar"
        weight="regular"
        type="caption"
        textAlign="center"
        color={AppColors.neutral[1000]}
        width="auto"
      />
    </View>
  );
};

export default GenerateButton;
