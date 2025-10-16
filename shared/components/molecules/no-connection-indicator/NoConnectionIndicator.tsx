import { View } from "react-native";

import { AppColors } from "../../../styles";

import { useScreenDimensionsStore } from "../../../hooks/store";

import { MaterialIcon, Typography } from "../../atoms";

import { NoConnectionIndicatorStyle } from "./NoConnectionIndicator.style";

interface NoConnectionIndicatorProps {
  message: string;
}

const NoConnectionIndicator = ({ message }: NoConnectionIndicatorProps) => {
  const size = useScreenDimensionsStore();
  return (
    <View style={NoConnectionIndicatorStyle(size).Container}>
      <MaterialIcon
        name="wifi-strength-off-outline"
        size={size === "mobile" ? 250 : 300}
        color={AppColors.neutral[300]}
      />
      <Typography
        text={message}
        weight="medium"
        type="button"
        textAlign="center"
        color={AppColors.neutral[300]}
        width="100%"
      />
    </View>
  );
};

export default NoConnectionIndicator;
