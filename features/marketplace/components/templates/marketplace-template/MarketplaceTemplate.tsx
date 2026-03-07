import { ReactNode } from "react";
import { ScrollView, View } from "react-native";

import { AppColors } from "@/shared/styles";

import { useMarketplace } from "@/features/marketplace/hooks/core";
import {
  useSubscriptionPlansQuery,
  useTokenPackagesQuery,
} from "@/features/marketplace/hooks/query";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import {
  AdvancePackageToken,
  BasicPackageToken,
  ProPackageToken,
  ScreenSection,
  SubscriptionPlan,
} from "@/shared/components/atoms";
import { LoadingTextIndicator } from "@/shared/components/molecules";
import { TokenPackageCard } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";
import { MarketplaceTemplateStyle } from "./MarketplaceTemplate.style";

const MarketplaceTemplate = () => {
  const size = useScreenDimensionsStore();

  const { isProccesingOrder, createPurchase } = useMarketplace();

  const { data: plans, isLoading: isPlansLoading } =
    useSubscriptionPlansQuery();
  const { data: packages, isLoading: isPackagesLoading } =
    useTokenPackagesQuery();

  const PackageImage: Record<number, ReactNode> = {
    0: <BasicPackageToken />,
    1: <ProPackageToken />,
    2: <AdvancePackageToken />,
  };

  return (
    <View style={GlobalStyles.RootContainer}>
      <ScrollView
        style={GlobalStyles.PageDimensions}
        contentContainerStyle={GlobalStyles.PageContent}
        showsVerticalScrollIndicator={false}
      >
        <ScreenSection
          description="Adquiere tus tokens Edu Prompt para que generes tus recursos educativos. Elige el paquete que mas tu guste."
          title="Paquetes"
          icon="bag-outline"
        />
        <ScrollView
          horizontal
          contentContainerStyle={MarketplaceTemplateStyle(size).PackageList}
        >
          {isPackagesLoading ? (
            <LoadingTextIndicator
              message="Cargando paquetes..."
              color={AppColors.primary[400]}
            />
          ) : packages ? (
            packages.map((tokenPackage, i) => (
              <TokenPackageCard
                key={tokenPackage.packageId}
                price={tokenPackage.price + "USD"}
                packageTitle={tokenPackage.title}
                description={tokenPackage.description}
                SvgIcon={PackageImage[i]}
                loading={{
                  isLoading: isProccesingOrder,
                  message: "Procesando compra...",
                }}
                onBuyPackage={() =>
                  createPurchase({
                    productId: tokenPackage.packageId,
                    title: tokenPackage.title,
                    description: tokenPackage.description,
                    price: tokenPackage.price,
                    productType: "token_package",
                    tokenAmount: tokenPackage.tokenAmount,
                  })
                }
              />
            ))
          ) : null}
        </ScrollView>
        <ScreenSection
          description="Si quieres generaciones y tokens ilimitados, ¡adquiere ahora Edu Prompt Pro por 9.99 USD por mes!"
          title="Plan de suscripción"
          icon="star-outline"
        />
        {isPlansLoading ? (
          <LoadingTextIndicator
            message="Cargando planes de suscripción..."
            color={AppColors.primary[400]}
          />
        ) : plans ? (
          plans.map((plan) => (
            <TokenPackageCard
              key={plan.subscriptionPlanId}
              price={`${plan.price}USD/Mes`}
              packageTitle={plan.title}
              description={plan.description}
              SvgIcon={<SubscriptionPlan />}
              full
              loading={{
                isLoading: isProccesingOrder,
                message: "Procesando compra...",
              }}
              buttonText={`Suscribirse ${plan.price}USD/Mes`}
              onBuyPackage={() =>
                createPurchase({
                  productId: plan.subscriptionPlanId,
                  title: plan.title,
                  description: plan.description,
                  price: plan.price,
                  productType: "subscription",
                })
              }
            />
          ))
        ) : null}
      </ScrollView>
    </View>
  );
};

export default MarketplaceTemplate;
