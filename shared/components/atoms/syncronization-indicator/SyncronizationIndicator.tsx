import { View } from "react-native";

import useResponsive from "@/shared/hooks/core/useResponsive";

import { Ionicon } from "../icon/Icon";

import { AppColors } from "@/shared/styles";

import { dynamicStyles } from "./SyncronizationIndicator.style";

interface SyncronizationIndicatorProps {
  synced: boolean;
}

const SyncronizationIndicator = ({ synced }: SyncronizationIndicatorProps) => {
  const size = useResponsive();

  const { Container } = dynamicStyles(size, synced);

  return (
    <View style={Container}>
      <Ionicon
        name={synced ? "cloud-done-outline" : "cloud-offline"}
        color={synced ? AppColors.basic.white : AppColors.neutral[600]}
        size={size === "mobile" ? 16 : 20}
      />
    </View>
  );
};

export default SyncronizationIndicator;
