import { useWindowDimensions, View } from "react-native";

import { AppColors } from "@/shared/styles";

import { useSyncIndicatorsMutation } from "@/features/dashboard/hooks/mutations";
import { useIndicatorsQuery } from "@/features/dashboard/hooks/queries";
import { useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { formatTokenAmount, getIndicatorPanelGrid } from "@/shared/utils";

import { Typography } from "@/shared/components/atoms";
import { InfoCard } from "@/shared/components/molecules";
import { DashboardIndicator } from "../../molecules";

import { DashboardIndicatorPanelStyle } from "./DashboardIndicatorPanel.style";

const DashboardIndicatorPanel = () => {
  const size = useScreenDimensionsStore();
  const { width } = useWindowDimensions();

  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const { indicators, isLoading } = useIndicatorsQuery();
  const { syncIndicators, isPending } = useSyncIndicatorsMutation();

  const userProfile = useEventbusValue("userProfile.user.updated", null);

  const { t } = useTranslations();

  const { PanelContainer, IndicatorsGrid } = DashboardIndicatorPanelStyle(size);
  const { firstWidth, secondWidth, thirdWidth } = getIndicatorPanelGrid(
    size,
    width,
  );

  return (
    <View style={PanelContainer}>
      <Typography
        text={t("dashboard_translations.dashboard_panel_labels.title")}
        weight="medium"
        type="button"
        textAlign="left"
        color={AppColors.neutral[1000]}
        width="auto"
        icon="bar-chart-outline"
      />
      <Typography
        text={t("dashboard_translations.dashboard_panel_labels.description")}
        weight="regular"
        type="paragraph"
        textAlign="left"
        color={AppColors.neutral[900]}
        width="100%"
      />

      <View style={IndicatorsGrid}>
        <DashboardIndicator
          icon="book-outline"
          value={`${indicators.generatedResources}`}
          label={t(
            "dashboard_translations.dashboard_panel_labels.indicator_labels.generated_resources",
          )}
          type="numeric"
          loading={isLoading}
          style={{
            width: firstWidth,
          }}
        />
        <DashboardIndicator
          icon="hardware-chip-outline"
          value={formatTokenAmount(indicators.usedTokens)}
          label={t(
            "dashboard_translations.dashboard_panel_labels.indicator_labels.used_tokens",
          )}
          type="numeric"
          loading={isLoading}
          style={{
            width: firstWidth,
          }}
        />

        <DashboardIndicator
          icon="download-outline"
          value={`${indicators.dowloadedResources}`}
          label={t(
            "dashboard_translations.dashboard_panel_labels.indicator_labels.downloaded_resources",
          )}
          type="numeric"
          loading={isLoading}
          style={{
            width: firstWidth,
          }}
        />
        <DashboardIndicator
          icon="save-outline"
          value={`${indicators.savedResources}`}
          label={t(
            "dashboard_translations.dashboard_panel_labels.indicator_labels.saved_resources",
          )}
          type="numeric"
          loading={isLoading}
          style={{
            width: secondWidth,
          }}
        />
        <DashboardIndicator
          icon="watch-outline"
          value={
            !indicators.lastGeneratedResource
              ? t(
                  "dashboard_translations.dashboard_panel_labels.indicator_labels.not_last_generated_resource",
                )
              : indicators.lastGeneratedResource
          }
          label={t(
            "dashboard_translations.dashboard_panel_labels.indicator_labels.last_generated_resource",
          )}
          type="alphabetic"
          loading={isLoading}
          style={{
            width: thirdWidth,
          }}
        />
      </View>
      {userProfile &&
      !userProfile.userPreferences.autoSync &&
      !indicators.sync &&
      isAuthenticated ? (
        <InfoCard
          title={t(
            "dashboard_translations.dashboard_panel_labels.syncronization_card_labels.title",
          )}
          description={t(
            "dashboard_translations.dashboard_panel_labels.syncronization_card_labels.description",
          )}
          buttonData={{
            onPress: syncIndicators,
            icon: "sync-outline",
            label: t(
              "dashboard_translations.dashboard_panel_labels.syncronization_card_labels.btn_sync",
            ),
            loading: isPending,
            loadingMessage: t(
              "dashboard_translations.dashboard_panel_labels.syncronization_card_labels.loading_text",
            ),
          }}
        />
      ) : null}
    </View>
  );
};

export default DashboardIndicatorPanel;
