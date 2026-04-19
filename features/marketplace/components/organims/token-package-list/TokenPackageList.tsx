import { ReactNode, useMemo } from "react";
import { ScrollView } from "react-native";

import { AppColors } from "@/shared/styles";

import { useMarketplace } from "@/features/marketplace/hooks/core";
import { useTokenPackagesQuery } from "@/features/marketplace/hooks/query";
import { useTranslations } from "@/shared/hooks/core";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import {
  AdvancePackageToken,
  BasicPackageToken,
  ProPackageToken,
} from "@/shared/components/atoms";
import { Empty, LoadingTextIndicator } from "@/shared/components/molecules";
import TokenPackageCard from "../token-package-card/TokenPackageCard";

import { dynamicStyles } from "./TokenPackageList.style";

const TokenPackageList = () => {
  const size = useScreenDimensionsStore();
  const { t, lang } = useTranslations();

  const { isProccesingOrder, createPurchase } = useMarketplace();

  const {
    data: packages,
    isLoading: isPackagesLoading,
    isError,
  } = useTokenPackagesQuery();

  const PackageImage: Record<number, ReactNode> = {
    0: <BasicPackageToken />,
    1: <ProPackageToken />,
    2: <AdvancePackageToken />,
  };

  const styles = useMemo(() => dynamicStyles(size), [size]);

  return (
    <ScrollView horizontal contentContainerStyle={styles.PackageList}>
      {isPackagesLoading ? (
        <LoadingTextIndicator
          message={t(
            "marketplace_translations.packages_section.loading_packages_msg",
          )}
          color={AppColors.primary[400]}
        />
      ) : packages ? (
        packages.map((tokenPackage, i) => (
          <TokenPackageCard
            key={tokenPackage.packageId}
            price={tokenPackage.price + "USD"}
            packageTitle={tokenPackage.title[lang]}
            description={tokenPackage.description[lang]}
            SvgIcon={PackageImage[i]}
            loading={{
              isLoading: isProccesingOrder,
              message: t(
                "marketplace_translations.packages_section.processing_purchase_msg",
              ),
            }}
            onBuyPackage={() =>
              createPurchase(
                {
                  productId: tokenPackage.packageId,
                  title: tokenPackage.title[lang],
                  description: tokenPackage.description[lang],
                  price: tokenPackage.price,
                  productType: "token_package",
                  tokenAmount: tokenPackage.tokenAmount,
                },
                false,
              )
            }
          />
        ))
      ) : (
        <Empty
          message={
            isError
              ? t("marketplace_translations.packages_section.error_msg")
              : t(
                  "marketplace_translations.packages_section.wifi_connection_msg",
                )
          }
          icon={isError ? "close-outline" : "wifi-outline"}
        />
      )}
    </ScrollView>
  );
};

export default TokenPackageList;
