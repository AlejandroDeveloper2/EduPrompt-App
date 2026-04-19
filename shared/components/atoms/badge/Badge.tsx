import { useMemo } from "react";
import { View } from "react-native";

import { BadgeVariantType } from "@/core/types";

import { AppColors } from "../../../styles";

import { useScreenDimensionsStore } from "../../../hooks/store";

import Typography from "../typography/Typography";

import { dynamicStyles } from "./Badge.style";

interface BadgeProps {
  label: string;
  variant: BadgeVariantType;
}

const Badge = ({ label, variant }: BadgeProps) => {
  const size = useScreenDimensionsStore();

  const badgeTextColor: string = useMemo(
    () =>
      variant === "neutral" ? AppColors.neutral[1000] : AppColors.basic.white,
    [variant],
  );

  const styles = useMemo(() => dynamicStyles(size, variant), [size, variant]);

  return (
    <View style={styles.badgeBox}>
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
