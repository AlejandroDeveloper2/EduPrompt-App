import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "../../../styles";

import { useAnimatedNavItem } from "../../../hooks/animations";
import { useScreenDimensionsStore } from "../../../hooks/store";

import { Ionicon, Typography } from "../../atoms";

import { NavItemStyle } from "./NavItem.style";

interface NavItemProps {
  active: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  Node?: ReactNode | ReactNode[];
  disabled?: boolean;
  label?: string;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const NavItem = ({
  active,
  icon,
  disabled,
  Node,
  label,
  onPress,
}: NavItemProps) => {
  const size = useScreenDimensionsStore();
  const animatedBackground = useAnimatedNavItem(active);

  const navItemStyle = NavItemStyle(size);

  return (
    <View style={navItemStyle.Container}>
      <AnimatedPressable
        onPress={onPress}
        disabled={disabled}
        style={[navItemStyle.NavItemPressable, animatedBackground]}
      >
        {Node && Node}
        <Ionicon
          name={icon}
          size={size === "mobile" ? 20 : 24}
          color={active ? AppColors.basic.white : AppColors.neutral[1000]}
        />
      </AnimatedPressable>
      {label && (
        <Typography
          text={label}
          weight="regular"
          type="caption"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="auto"
        />
      )}
    </View>
  );
};

export default NavItem;
