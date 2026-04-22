import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "../../../styles";

import { useResponsive } from "@/shared/hooks/core";
import { useAnimatedNavItem } from "../../../hooks/animations";

import { Ionicon, Typography } from "../../atoms";

import { dynamicStyles } from "./NavItem.style";

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
  const size = useResponsive();
  const animatedBackground = useAnimatedNavItem(active);

  const styles = dynamicStyles(size);

  return (
    <View style={styles.Container}>
      <AnimatedPressable
        onPress={onPress}
        disabled={disabled}
        style={[styles.NavItemPressable, animatedBackground]}
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
