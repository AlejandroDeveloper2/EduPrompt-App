import { ScrollView, View } from "react-native";

import { useTranslations } from "@/shared/hooks/core";

import { ScreenSection } from "@/shared/components/atoms";
import { BackgroundProcessPanel } from "@/shared/components/organims";
import { DashboardIndicatorPanel } from "../../organims";

import { Spacing } from "@/shared/styles";
import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const DashboardTemplate = () => {
  const { t } = useTranslations();

  return (
    <View style={GlobalStyles.RootContainer}>
      <ScrollView
        style={GlobalStyles.PageDimensions}
        contentContainerStyle={GlobalStyles.PageContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: Spacing.spacing_xl }}>
          <ScreenSection
            description={t("dashboard_translations.screen_description")}
            title={t("dashboard_translations.screen_title")}
            icon="grid-outline"
          />
          <DashboardIndicatorPanel />
          <BackgroundProcessPanel />
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardTemplate;
