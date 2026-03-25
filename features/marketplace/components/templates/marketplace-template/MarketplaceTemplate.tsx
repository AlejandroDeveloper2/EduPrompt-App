import { ScrollView, View } from "react-native";

import { useTranslations } from "@/shared/hooks/core";

import { ScreenSection } from "@/shared/components/atoms";
import { SubscriptionPlanList, TokenPackageList } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const MarketplaceTemplate = () => {
  const { t } = useTranslations();

  return (
    <View style={GlobalStyles.RootContainer}>
      <ScrollView
        style={GlobalStyles.PageDimensions}
        contentContainerStyle={GlobalStyles.PageContent}
        showsVerticalScrollIndicator={false}
      >
        <ScreenSection
          description={t(
            "marketplace-translations.packages-section.description",
          )}
          title={t("marketplace_translations.packages_section.title")}
          icon="bag-outline"
        />
        <TokenPackageList />
        <ScreenSection
          description={t("marketplace_translations.plans_section.description")}
          title={t("marketplace_translations.plans_section.title")}
          icon="star-outline"
        />
        <SubscriptionPlanList />
      </ScrollView>
    </View>
  );
};

export default MarketplaceTemplate;
