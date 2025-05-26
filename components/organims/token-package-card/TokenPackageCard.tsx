import { ReactNode } from "react";
import { View } from "react-native";

import { AppColors } from "@/styles";

import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { Typography } from "@/components/atoms";
import { Button } from "@/components/molecules";

import { TokenPackageCardStyle } from "./TokenPackageCard.style";

interface TokenPackageCardProps {
  packageId: string;
  price: string;
  packageTitle: string;
  description: string;
  SvgIcon: ReactNode;
  onBuyPackage: () => void;
}

const TokenPackageCard = ({
  price,
  packageTitle,
  description,
  SvgIcon,
  onBuyPackage,
}: TokenPackageCardProps) => {
  const size = useScreenDimensionsStore();

  const tokenPackageCardStyle = TokenPackageCardStyle(size);

  return (
    <View style={tokenPackageCardStyle.CardContainer}>
      <View style={tokenPackageCardStyle.PriceSection}>
        {SvgIcon}
        <Typography
          text={price}
          weight="bold"
          type="button"
          textAlign="center"
          color={AppColors.neutral[900]}
          width="auto"
        />
      </View>
      <View style={tokenPackageCardStyle.CardBody}>
        <Typography
          text={packageTitle}
          weight="bold"
          type="button"
          textAlign="center"
          color={AppColors.basic.white}
          width="auto"
        />
        <Typography
          text={description}
          weight="regular"
          type="paragraph"
          textAlign="center"
          color={AppColors.basic.white}
          width="auto"
        />
        <Button
          label="Comprar"
          icon="cart-outline"
          width="100%"
          variant="neutral"
          onPress={onBuyPackage}
        />
      </View>
    </View>
  );
};

export default TokenPackageCard;
