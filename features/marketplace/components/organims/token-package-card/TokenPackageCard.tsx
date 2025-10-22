import { ReactNode } from "react";
import { View } from "react-native";

import { AppColors } from "@/shared/styles";

import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { Typography } from "@/shared/components/atoms";
import { Button } from "@/shared/components/molecules";

import { TokenPackageCardStyle } from "./TokenPackageCard.style";

interface TokenPackageCardProps {
  packageId: string;
  price: string;
  packageTitle: string;
  description: string;
  SvgIcon: ReactNode;
  full?: boolean;
  onBuyPackage: () => void;
}

const TokenPackageCard = ({
  price,
  packageTitle,
  description,
  full,
  SvgIcon,
  onBuyPackage,
}: TokenPackageCardProps) => {
  const size = useScreenDimensionsStore();

  const tokenPackageCardStyle = TokenPackageCardStyle(size, full);

  return (
    <View style={tokenPackageCardStyle.CardContainer}>
      <View style={tokenPackageCardStyle.PriceSection}>{SvgIcon}</View>
      <View style={tokenPackageCardStyle.CardBody}>
        <Typography
          text={packageTitle}
          weight="bold"
          type="button"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="auto"
        />
        <Typography
          text={description}
          weight="regular"
          type="paragraph"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="auto"
        />
        <Button
          label={`Comprar ${price}`}
          icon="cart-outline"
          width="100%"
          variant="primary"
          onPress={onBuyPackage}
        />
      </View>
    </View>
  );
};

export default TokenPackageCard;
