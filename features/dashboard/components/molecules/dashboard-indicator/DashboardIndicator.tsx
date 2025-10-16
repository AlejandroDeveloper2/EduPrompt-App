import { Ionicons } from "@expo/vector-icons";
import { View, ViewStyle } from "react-native";

import { AppColors } from "@/shared/styles";

import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { Ionicon, Typography } from "@/shared/components/atoms";

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

  const dashboardIndicatorStyle = DashboardIndicatorStyle(size);

  return (
    <View style={[dashboardIndicatorStyle.IndicatorContainer, style]}>
      <View style={dashboardIndicatorStyle.ValueIndicator}>
        <Ionicon
          name={icon}
          size={size === "mobile" ? 22 : 24}
          color={AppColors.neutral[1000]}
        />
        <Typography
          text={value}
          weight={type === "numeric" ? "bold" : "regular"}
          type={type === "numeric" ? "h2" : "paragraph"}
          textAlign="center"
          color={AppColors.primary[400]}
          width="auto"
        />
      </View>

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
