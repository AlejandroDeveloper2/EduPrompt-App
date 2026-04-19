import { useMemo } from "react";
import { useWindowDimensions, View } from "react-native";

import { AppColors } from "@/shared/styles";

import { useIndicatorsQuery } from "@/features/dashboard/hooks/queries";
import { useTranslations } from "@/shared/hooks/core";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { formatTokenAmount, getIndicatorPanelGrid } from "@/shared/utils";

import { Typography } from "@/shared/components/atoms";
import { DashboardIndicator } from "../../molecules";

import { dynamicStyles } from "./DashboardIndicatorPanel.style";

const DashboardIndicatorPanel = () => {
  const size = useScreenDimensionsStore();
  const { width } = useWindowDimensions();

  const { indicators, isLoading } = useIndicatorsQuery();
  const { t } = useTranslations();

  const { firstWidth, secondWidth, thirdWidth } = useMemo(
    () => getIndicatorPanelGrid(size, width),
    [size, width],
  );

  const { PanelContainer, IndicatorsGrid } = useMemo(
    () => dynamicStyles(size),
    [size],
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
    </View>
  );
};

export default DashboardIndicatorPanel;
