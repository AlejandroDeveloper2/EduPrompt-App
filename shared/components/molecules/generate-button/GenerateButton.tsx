import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors } from "../../../styles";

import { useResponsive, useTranslations } from "@/shared/hooks/core";
import { useAnimatedNavItem } from "../../../hooks/animations";

import { Ionicon, Typography } from "../../atoms";

import { dynamicStyles } from "./GenerateButton.style";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface GenerateButtonProps {
  active: boolean;
  onPress: () => void;
}

const GenerateButton = ({ active, onPress }: GenerateButtonProps) => {
  const size = useResponsive();
  const animatedBackgroundStyle = useAnimatedNavItem(active);
  const { t } = useTranslations();

  const styles = dynamicStyles(size);

  return (
    <View style={styles.Container}>
      <AnimatedPressable
        onPress={onPress}
        style={[styles.NavItemPressable, animatedBackgroundStyle]}
      >
        <Ionicon
          name="bulb-outline"
          size={size === "mobile" ? 36 : 40}
          color={active ? AppColors.basic.white : AppColors.neutral[1000]}
        />
      </AnimatedPressable>
      <Typography
        text={t("common_translations.generate_button_label")}
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
