import { View } from "react-native";

import { BadgeVariantType } from "@/lib/types";

import { AppColors } from "@/styles";

import { useScreenDimensionsStore } from "@/lib/hooks/store";

import Typography from "../typography/Typography";

import { BadgeStyle } from "./Badge.style";

interface BadgeProps {
  label: string;
  variant: BadgeVariantType;
}

const Badge = ({ label, variant }: BadgeProps) => {
  const size = useScreenDimensionsStore();
  const badgeTextColor: string =
    variant === "neutral" ? AppColors.neutral[1000] : AppColors.basic.white;

  return (
    <View style={BadgeStyle(size, variant).badgeBox}>
      <Typography
        text={label}
        weight="light"
        type="caption"
        textAlign="center"
        color={badgeTextColor}
        width="auto"
      />
    </View>
  );
};

export default Badge;
