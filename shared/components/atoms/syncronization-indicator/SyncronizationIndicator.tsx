import { useMemo } from "react";
import { View } from "react-native";

import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { Ionicon } from "../icon/Icon";

import { AppColors } from "@/shared/styles";

import { dynamicStyles } from "./SyncronizationIndicator.style";

interface SyncronizationIndicatorProps {
  synced: boolean;
}

const SyncronizationIndicator = ({ synced }: SyncronizationIndicatorProps) => {
  const size = useScreenDimensionsStore();

  const { Container } = useMemo(
    () => dynamicStyles(size, synced),
    [size, synced],
  );

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
