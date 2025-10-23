import { ActivityIndicator, View } from "react-native";

import { AppColors } from "../../../styles";

import { useScreenDimensionsStore } from "../../../hooks/store";

import { TokenCoin, Typography } from "../../atoms";

import { TokenBadgeStyle } from "./TokenBadge.style";

interface TokenBadgeProps {
  tokenAmount: string;
  isLoading: boolean;
}

const TokenBadge = ({ tokenAmount, isLoading }: TokenBadgeProps) => {
  const size = useScreenDimensionsStore();

  return (
    <View style={TokenBadgeStyle(size).Container}>
      <TokenCoin />
      {isLoading ? (
        <ActivityIndicator size="small" color={AppColors.primary[400]} />
      ) : (
        <Typography
          text={tokenAmount}
          weight="regular"
          type="paragraph"
          textAlign="center"
          color={AppColors.primary[400]}
          width="auto"
        />
      )}
    </View>
  );
};

export default TokenBadge;
