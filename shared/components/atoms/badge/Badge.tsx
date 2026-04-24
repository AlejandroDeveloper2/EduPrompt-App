import { View } from "react-native";

import { BadgeVariantType } from "@/core/types";

import { AppColors } from "../../../styles";

import Typography from "../typography/Typography";

import useResponsive from "@/shared/hooks/core/useResponsive";
import { dynamicStyles } from "./Badge.style";

interface BadgeProps {
  label: string;
  variant: BadgeVariantType;
}

const Badge = ({ label, variant }: BadgeProps) => {
  const size = useResponsive();

  const badgeTextColor: string =
    variant === "neutral" ? AppColors.neutral[1000] : AppColors.basic.white;
  const styles = dynamicStyles(size, variant);

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
