import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import { AppColors } from "@/shared/styles";

import { Badge, Typography } from "@/shared/components/atoms";

import { SubscriptionStatus } from "@/features/marketplace/types";
import { SubscriptionDetailPanelStyle } from "./SubscriptionDetail.style";

interface SubscriptionDetailProps {
  label: string;
  value: string;
  icon?: keyof typeof Ionicons.glyphMap;
  badge?: boolean;
  status?: SubscriptionStatus;
}

const SubscriptionDetail = ({
  label,
  value,
  icon,
  badge,
  status,
}: SubscriptionDetailProps) => {
  return (
    <View style={SubscriptionDetailPanelStyle.Container}>
      <Typography
        text={label}
        weight="regular"
        type="paragraph"
        textAlign="left"
        color={AppColors.neutral[1000]}
        width="auto"
        icon={icon}
      />
      {badge && status ? (
        <Badge
          label={value}
          variant={
            status === "active"
              ? "primary"
              : status === "cancelled"
                ? "neutral"
                : "danger"
          }
        />
      ) : (
        <Typography
          text={value}
          weight="bold"
          type="paragraph"
          textAlign="right"
          color={AppColors.neutral[1000]}
          width="auto"
        />
      )}
    </View>
  );
};

export default SubscriptionDetail;
