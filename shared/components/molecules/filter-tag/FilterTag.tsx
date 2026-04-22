import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "../../../styles";

import { useResponsive } from "@/shared/hooks/core";
import { useAnimatedNavItem as useAnimatedFilterTag } from "../../../hooks/animations";

import { Typography } from "../../atoms";

import { dynamicStyles } from "./FilterTag.style";

interface FilterTagProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  active: boolean;
  onPressFilter: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const FilterTag = ({ icon, label, active, onPressFilter }: FilterTagProps) => {
  const size = useResponsive();
  const animatedBackgroundStyle = useAnimatedFilterTag(active, true);

  const styles = dynamicStyles(size);

  return (
    <AnimatedPressable
      style={[styles.PressableBox, animatedBackgroundStyle]}
      onPress={onPressFilter}
    >
      <Typography
        text={label}
        weight="regular"
        type="caption"
        textAlign="center"
        color={active ? AppColors.basic.white : AppColors.neutral[1000]}
        width="auto"
        icon={icon}
      />
    </AnimatedPressable>
  );
};

export default FilterTag;
