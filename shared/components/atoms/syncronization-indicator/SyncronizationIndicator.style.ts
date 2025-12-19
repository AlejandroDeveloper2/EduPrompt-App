import { StyleSheet } from "react-native";

import { SizeType } from "@/core/types";
import { AppColors, Radius } from "@/shared/styles";

export const SyncronizationIndicatorStyle = (size: SizeType, synced: boolean) =>
  StyleSheet.create({
    Container: {
      width: size === "mobile" ? 25 : 30,
      height: size === "mobile" ? 25 : 30,
      backgroundColor: synced ? AppColors.primary[300] : AppColors.neutral[0],
      borderRadius: Radius.radius_rounded,
      justifyContent: "center",
      alignItems: "center",
    },
  });
