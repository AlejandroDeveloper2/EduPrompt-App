import { ActivityIndicator, View } from "react-native";

import { AppColors } from "../../../styles";

import { useResponsive } from "@/shared/hooks/core";

import { Ionicon, TokenCoin, Typography } from "../../atoms";

import { dynamicStyles } from "./TokenBadge.style";

interface TokenBadgeProps {
  tokenAmount: string;
  isLoading: boolean;
  isPremium: boolean;
}

const TokenBadge = ({ tokenAmount, isLoading, isPremium }: TokenBadgeProps) => {
  const size = useResponsive();

  const styles = dynamicStyles(size);
  const TokenValue = isPremium ? (
    <Ionicon
      name="infinite-outline"
      color={AppColors.neutral[1000]}
      size={32}
    />
  ) : (
    <Typography
      text={tokenAmount}
      weight="regular"
      type="paragraph"
      textAlign="center"
      color={AppColors.primary[400]}
      width="auto"
    />
  );

  return (
    <View style={styles.Container}>
      <TokenCoin />
      {isLoading ? (
        <ActivityIndicator size="small" color={AppColors.primary[400]} />
      ) : (
        TokenValue
      )}
    </View>
  );
};

export default TokenBadge;
