import { Ionicons } from "@expo/vector-icons";
import { ReactNode, useMemo } from "react";
import { View } from "react-native";

import { AppColors } from "@/shared/styles";

import { useTranslations } from "@/shared/hooks/core";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { Typography } from "@/shared/components/atoms";
import { Button } from "@/shared/components/molecules";

import { dynamicStyles } from "./TokenPackageCard.style";

interface TokenPackageCardProps {
  price: string;
  packageTitle: string;
  description: string;
  SvgIcon: ReactNode;
  full?: boolean;
  buttonText?: string;
  loading: {
    isLoading: boolean;
    message: string | null;
  };
  buttonDisabled?: boolean;
  buttonIcon?: keyof typeof Ionicons.glyphMap;
  onBuyPackage: () => void;
}

const TokenPackageCard = ({
  price,
  packageTitle,
  description,
  full,
  SvgIcon,
  loading,
  buttonText,
  buttonIcon,
  buttonDisabled,
  onBuyPackage,
}: TokenPackageCardProps) => {
  const size = useScreenDimensionsStore();
  const { t } = useTranslations();

  const styles = useMemo(() => dynamicStyles(size, full), [size, full]);

  return (
    <View style={styles.CardContainer}>
      <View style={styles.PriceSection}>{SvgIcon}</View>
      <View style={styles.CardBody}>
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
          label={
            buttonText
              ? buttonText
              : `${t("marketplace_translations.product_card_buy_btn_label")} ${price}`
          }
          icon={buttonIcon ?? "cart-outline"}
          width="100%"
          variant="primary"
          loading={loading.isLoading}
          loadingMessage={loading.message ?? "..."}
          onPress={onBuyPackage}
          disabled={buttonDisabled}
        />
      </View>
    </View>
  );
};

export default TokenPackageCard;
