import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import { AppColors } from "@/styles";

import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { Ionicon, Typography } from "@/components/atoms";
import { EmptyStyle } from "./Empty.style";

interface EmptyProps {
  message: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const Empty = ({ message, icon }: EmptyProps) => {
  const size = useScreenDimensionsStore();
  return (
    <View style={EmptyStyle(size).Container}>
      <Ionicon
        name={icon}
        size={size === "mobile" ? 50 : 80}
        color={AppColors.neutral[400]}
      />
      <Typography
        text={message}
        weight="regular"
        type="paragraph"
        textAlign="center"
        color={AppColors.neutral[400]}
        width="auto"
      />
    </View>
  );
};

export default Empty;
