import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "@/styles";

import { useAnimatedNavItem } from "@/lib/hooks/animations";
import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { Ionicon, Typography } from "@/components/atoms";

import { NavItemStyle } from "./NavItem.style";

interface NavItemProps {
  active: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  label?: string;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const NavItem = ({ active, icon, disabled, label, onPress }: NavItemProps) => {
  const size = useScreenDimensionsStore();
  const animatedBackground = useAnimatedNavItem(active);

  const navItemStyle = NavItemStyle(size);

  return (
    <View style={navItemStyle.Container}>
      <AnimatedPressable
        onPress={onPress}
        style={[navItemStyle.NavItemPressable, animatedBackground]}
      >
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
