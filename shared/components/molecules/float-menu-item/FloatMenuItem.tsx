import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "@/shared/styles";

import { useAnimatedNavItem } from "@/shared/hooks/animations";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { Typography } from "../../atoms";

import { FloatMenuItemStyle } from "./FloatMenuItem.style";

interface FloatMenuItemProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  active: boolean;
  Node?: ReactNode | ReactNode[];
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const FloatMenuItem = ({
  label,
  icon,
  active,
  Node,
  onPress,
}: FloatMenuItemProps) => {
  const size = useScreenDimensionsStore();
  const animatedBackground = useAnimatedNavItem(active);

  return (
    <AnimatedPressable
      style={[FloatMenuItemStyle(size).ItemContainer, animatedBackground]}
      onPress={onPress}
    >
      <Typography
        text={label}
        weight="regular"
        type="button"
        textAlign="left"
        color={active ? AppColors.basic.white : AppColors.neutral[1000]}
        width="auto"
        icon={icon}
      />
      {Node && Node}
    </AnimatedPressable>
  );
};

export default FloatMenuItem;
