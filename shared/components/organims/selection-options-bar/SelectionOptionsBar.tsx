import { View } from "react-native";
import Animated from "react-native-reanimated";

import { NavOption } from "@/core/types";
import { AppColors } from "@/shared/styles";

import { useAnimatedToolbar } from "@/shared/hooks/animations";
import { useResponsive, useTranslations } from "@/shared/hooks/core";

import { Ionicon, Typography } from "../../atoms";
import { ToolButton } from "../../molecules";

import { dynamicStyles } from "./SelectionOptionsBar.style";

interface SelectionOptionsBarProps {
  isAllSelected: boolean;
  selectionMode: boolean;
  actionsDisabled: boolean;
  actions: NavOption[];
  selectionCount: number;
  toggleSelectAll: () => void;
  disableSelectionMode: () => void;
}

const SelectionOptionsBar = ({
  isAllSelected,
  selectionMode,
  actionsDisabled,
  actions,
  selectionCount,
  toggleSelectAll,
  disableSelectionMode,
}: SelectionOptionsBarProps) => {
  const size = useResponsive();
  const { t } = useTranslations();
  const animatedTranslate = useAnimatedToolbar(
    selectionMode,
    disableSelectionMode,
  );

  const styles = dynamicStyles(size);

  return (
    <Animated.View style={[styles.Container, animatedTranslate]}>
      <View style={styles.Slide}>
        <Ionicon
          name="close-outline"
          size={size === "mobile" ? 24 : 32}
          color={AppColors.neutral[1000]}
          onPress={disableSelectionMode}
        />
        <Ionicon
          name="list-outline"
          size={size === "mobile" ? 24 : 32}
          color={
            isAllSelected ? AppColors.primary[400] : AppColors.neutral[1000]
          }
          onPress={toggleSelectAll}
        />
      </View>

      <Typography
        text={`${t(
          "common_translations.toolbar_labels.selected_elements_label",
        )} (${selectionCount})`}
        weight="regular"
        type="paragraph"
        textAlign="center"
        color={AppColors.neutral[1000]}
        width="auto"
      />
      <View style={styles.Slide}>
        {actions.map((action) => (
          <ToolButton
            key={action.navItemId}
            icon={action.icon}
            onPress={action.onPress}
            disabled={actionsDisabled}
          />
        ))}
      </View>
    </Animated.View>
  );
};

export default SelectionOptionsBar;
