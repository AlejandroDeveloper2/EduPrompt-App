import { View } from "react-native";

import { AppColors } from "@/styles";

import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { TokenCoin, Typography } from "@/components/atoms";

import { TokenBadgeStyle } from "./TokenBadge.style";

interface TokenBadgeProps {
  tokenAmount: string;
}

const TokenBadge = ({ tokenAmount }: TokenBadgeProps) => {
  const size = useScreenDimensionsStore();

  return (
    <View style={TokenBadgeStyle(size).Container}>
      <TokenCoin />
      <Typography
        text={tokenAmount}
        weight="regular"
        type="paragraph"
        textAlign="center"
        color={AppColors.primary[400]}
        width="auto"
      />
    </View>
  );
};

export default TokenBadge;
