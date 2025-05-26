import Animated from "react-native-reanimated";

import { AppColors } from "@/styles";

import { useAnimatedToolbar } from "@/lib/hooks/animations";
import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { Ionicon, Typography } from "@/components/atoms";

import { ToolbarStyle } from "./ToolBar.style";

interface ToolbarProps {
  selectionMode: boolean;
  onHidden: () => void;
  toggleSelectionMode: () => void;
}

const Toolbar = ({
  selectionMode,
  onHidden,
  toggleSelectionMode,
}: ToolbarProps) => {
  const size = useScreenDimensionsStore();
  const animatedTranslate = useAnimatedToolbar(selectionMode, onHidden);

  return (
    <Animated.View style={[ToolbarStyle(size).Container, animatedTranslate]}>
      <Ionicon
        name="close-outline"
        size={size === "mobile" ? 20 : 24}
        color={AppColors.neutral[1000]}
        onPress={toggleSelectionMode}
      />
      <Typography
        text="Recursos seleccionados (2)"
        weight="regular"
        type="button"
        textAlign="center"
        color={AppColors.neutral[1000]}
        width="auto"
      />
      <Ionicon
        name="list-outline"
        size={size === "mobile" ? 20 : 24}
        color={AppColors.neutral[1000]}
      />
    </Animated.View>
  );
};

export default Toolbar;
