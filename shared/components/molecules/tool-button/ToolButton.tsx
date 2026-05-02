import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "@/shared/styles";

import { useAnimatedNavItem } from "@/shared/hooks/animations";
import { useResponsive } from "@/shared/hooks/core";

import { Ionicon } from "../../atoms";

import { dynamicStyles } from "./ToolButton.style";

interface ToolButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ToolButton = ({ icon, disabled, onPress }: ToolButtonProps) => {
  const size = useResponsive();
  const animatedBackground = useAnimatedNavItem(false);

  const styles = dynamicStyles(size);
  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.OptionPressable,
        animatedBackground,
        disabled && { backgroundColor: AppColors.neutral[50] },
      ]}
    >
      <Ionicon
        name={icon}
        size={size === "mobile" ? 20 : 24}
        color={disabled ? AppColors.neutral[400] : AppColors.neutral[1000]}
      />
    </AnimatedPressable>
  );
};

export default ToolButton;
