import Animated from "react-native-reanimated";

import { AppColors } from "../../../styles";

import { useSelectionModeContext } from "@/shared/hooks/context";
import { useAnimatedToolbar } from "../../../hooks/animations";
import { useScreenDimensionsStore } from "../../../hooks/store";

import { Ionicon, Typography } from "../../atoms";

import { ToolbarStyle } from "./ToolBar.style";

const Toolbar = () => {
  const size = useScreenDimensionsStore();
  const {
    selectionMode,
    selectedItems,
    allSelected,
    disableSelectionMode,
    toggleSelectAll,
  } = useSelectionModeContext();

  const animatedTranslate = useAnimatedToolbar(
    selectionMode,
    disableSelectionMode
  );

  return (
    <Animated.View style={[ToolbarStyle(size).Container, animatedTranslate]}>
      <Ionicon
        name="close-outline"
        size={size === "mobile" ? 20 : 24}
        color={AppColors.neutral[1000]}
        onPress={disableSelectionMode}
      />
      <Typography
        text={`Elementos seleccionados (${selectedItems})`}
        weight="regular"
        type="button"
        textAlign="center"
        color={AppColors.neutral[1000]}
        width="auto"
      />
      <Ionicon
        name="list-outline"
        size={size === "mobile" ? 20 : 24}
        color={allSelected ? AppColors.primary[400] : AppColors.neutral[1000]}
        onPress={toggleSelectAll}
      />
    </Animated.View>
  );
};

export default Toolbar;
