import Animated from "react-native-reanimated";

import { AppColors } from "../../../styles";

import { useSelectionModeContext } from "@/shared/hooks/context";
import { useEventbusValue } from "@/shared/hooks/events";
import { useAnimatedToolbar } from "../../../hooks/animations";
import { useScreenDimensionsStore } from "../../../hooks/store";

import { Ionicon, Typography } from "../../atoms";

import { Pressable } from "react-native";
import { ToolbarStyle } from "./ToolBar.style";

const Toolbar = () => {
  const size = useScreenDimensionsStore();

  const selectedItems = useEventbusValue(
    "selectionMode.selectedElements.updated",
    0
  );

  const { selectionMode, allSelected, disableSelectionMode, toggleSelectAll } =
    useSelectionModeContext();

  const animatedTranslate = useAnimatedToolbar(
    selectionMode,
    disableSelectionMode
  );

  return (
    <Animated.View style={[ToolbarStyle(size).Container, animatedTranslate]}>
      <Pressable onPress={disableSelectionMode}>
        <Ionicon
          name="close-outline"
          size={size === "mobile" ? 20 : 24}
          color={AppColors.neutral[1000]}
        />
      </Pressable>

      <Typography
        text={`Elementos seleccionados (${selectedItems})`}
        weight="regular"
        type="button"
        textAlign="center"
        color={AppColors.neutral[1000]}
        width="auto"
      />
      <Pressable onPress={toggleSelectAll}>
        <Ionicon
          name="list-outline"
          size={size === "mobile" ? 24 : 32}
          color={allSelected ? AppColors.primary[400] : AppColors.neutral[1000]}
        />
      </Pressable>
    </Animated.View>
  );
};

export default Toolbar;
