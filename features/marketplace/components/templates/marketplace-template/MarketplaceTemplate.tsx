import { ScrollView, View } from "react-native";

import { TokenPackage } from "@/features/marketplace/types";

import { useScreenDimensionsStore } from "@/shared/hooks/store";

import {
  AdvancePackageToken,
  BasicPackageToken,
  ProPackageToken,
  ScreenSection,
  SubscriptionPlan,
} from "@/shared/components/atoms";
import { TokenPackageCard } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";
import { MarketplaceTemplateStyle } from "./MarketplaceTemplate.style";

const packages: TokenPackage[] = [
  {
    packageId: "1",
    price: "2.99USD",
    packageTitle: "Paquete Básico",
    description: "¡Hasta 100 tokens instantáneos!",
    SvgIcon: <BasicPackageToken />,
  },
  {
    packageId: "2",
    price: "6.99USD",
    packageTitle: "Paquete Pro",
    description: "¡Hasta 300 tokens instantáneos!",
    SvgIcon: <ProPackageToken />,
  },
  {
    packageId: "3",
    price: "14.99USD",
    packageTitle: "Paquete Avanzado",
    description: "¡Hasta 1000 tokens instantáneos!",
    SvgIcon: <AdvancePackageToken />,
  },
];

const MarketplaceTemplate = () => {
  const size = useScreenDimensionsStore();

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
          {packages.map((pack) => (
            <TokenPackageCard
              key={pack.packageId}
              packageId={pack.packageId}
              price={pack.price}
              packageTitle={pack.packageTitle}
              description={pack.description}
              SvgIcon={pack.SvgIcon}
              onBuyPackage={() => {}}
            />
          ))}
        </ScrollView>
        <ScreenSection
          description="Si quieres generaciones y tokens ilimitados, ¡adquiere ahora Edu Prompt Pro por 3.99 USD por mes!"
          title="Plan de suscripción"
          icon="star-outline"
        />
        <TokenPackageCard
          packageId="4"
          price="3.99USD/Mes"
          packageTitle="Plan Edu Prompt Pro"
          description="Que se te terminen los tokens ya no será un problema. ¡Genera sin limites!"
          SvgIcon={<SubscriptionPlan />}
          full
          onBuyPackage={() => {}}
        />
      </ScrollView>
    </View>
  );
};

export default MarketplaceTemplate;
