import { Pressable } from "react-native";
import Animated from "react-native-reanimated";

import { AppColors, Spacing } from "../../../styles";

import { useResponsive, useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useAnimatedToolbar } from "../../../hooks/animations";
import { useSelectionModeStore } from "../../../hooks/store";

import { Ionicon, Typography } from "../../atoms";

import { dynamicStyles } from "./ToolBar.style";

const Toolbar = () => {
  const size = useResponsive();

  const { selectionMode, disableSelectionMode, toggleSelectAll } =
    useSelectionModeStore();

  const isAllSelected: boolean = useEventbusValue(
    "selectionMode.isAllSelected.updated",
    false,
  );
  const selectionCount: number = useEventbusValue(
    "selectionMode.selectedElements.updated",
    0,
  );
  const animatedTranslate = useAnimatedToolbar(
    selectionMode,
    disableSelectionMode,
  );
  const { t } = useTranslations();

  const styles = dynamicStyles(size);

  return (
    <Animated.View style={[styles.Container, animatedTranslate]}>
      <Pressable
        style={{ padding: Spacing.spacing_sm }}
        onPress={disableSelectionMode}
      >
        <Ionicon
          name="close-outline"
          size={size === "mobile" ? 24 : 32}
          color={AppColors.neutral[1000]}
        />
      </Pressable>

      <Typography
        text={`${t(
          "common_translations.toolbar_labels.selected_elements_label",
        )} (${selectionCount})`}
        weight="regular"
        type="button"
        textAlign="center"
        color={AppColors.neutral[1000]}
        width="auto"
      />
      <Pressable
        style={{ padding: Spacing.spacing_sm }}
        onPress={() => toggleSelectAll()}
      >
        <Ionicon
          name="list-outline"
          size={size === "mobile" ? 24 : 32}
          color={
            isAllSelected ? AppColors.primary[400] : AppColors.neutral[1000]
          }
        />
      </Pressable>
    </Animated.View>
  );
};

export default Toolbar;
