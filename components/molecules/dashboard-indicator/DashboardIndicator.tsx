import { Ionicons } from "@expo/vector-icons";
import { View, ViewStyle } from "react-native";

import { AppColors } from "@/styles";

import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { Typography } from "@/components/atoms";

import { DashboardIndicatorStyle } from "./DashboardIndicator.style";

interface DashboardIndicatorProps {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
  type: "numeric" | "alphabetic";
  style?: ViewStyle;
}

const DashboardIndicator = ({
  icon,
  value,
  label,
  type,
  style,
}: DashboardIndicatorProps) => {
  const size = useScreenDimensionsStore();

  return (
    <View style={[DashboardIndicatorStyle(size).IndicatorContainer, style]}>
      <Typography
        icon={icon}
        text={value}
        weight={type === "numeric" ? "bold" : "regular"}
        type={type === "numeric" ? "h2" : "paragraph"}
        textAlign="center"
        color={AppColors.primary[400]}
        width="auto"
      />
      <Typography
        text={label}
        weight="regular"
        type="caption"
        textAlign="center"
        color={AppColors.neutral[900]}
        width="auto"
      />
    </View>
  );
};

export default DashboardIndicator;
