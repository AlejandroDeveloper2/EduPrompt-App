import { useWindowDimensions, View } from "react-native";

import { AppColors } from "@/shared/styles";

import { useSyncIndicatorsMutation } from "@/features/dashboard/hooks/mutations";
import { useIndicatorsQuery } from "@/features/dashboard/hooks/queries";
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

  const { indicators, isLoading } = useIndicatorsQuery();
  const { syncIndicators, isPending } = useSyncIndicatorsMutation();

  const userProfile = useEventbusValue("userProfile.user.updated", null);

  const { PanelContainer, IndicatorsGrid } = DashboardIndicatorPanelStyle(size);
  const { firstWidth, secondWidth, thirdWidth } = getIndicatorPanelGrid(
    size,
    width
  );

  return (
    <View style={PanelContainer}>
      <Typography
        text="Indicadores"
        weight="medium"
        type="button"
        textAlign="left"
        color={AppColors.neutral[1000]}
        width="auto"
        icon="bar-chart-outline"
      />
      <Typography
        text="Monitorea tus estadísticas en Edu Prompt para un mejor control de tus actividades."
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
          label="Recursos generados"
          type="numeric"
          loading={isLoading}
          style={{
            width: firstWidth,
          }}
        />
        <DashboardIndicator
          icon="hardware-chip-outline"
          value={formatTokenAmount(indicators.usedTokens)}
          label="Tokens usados"
          type="numeric"
          loading={isLoading}
          style={{
            width: firstWidth,
          }}
        />

        <DashboardIndicator
          icon="download-outline"
          value={`${indicators.dowloadedResources}`}
          label="Recursos descargados"
          type="numeric"
          loading={isLoading}
          style={{
            width: firstWidth,
          }}
        />
        <DashboardIndicator
          icon="save-outline"
          value={`${indicators.savedResources}`}
          label="Recursos guardados"
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
              ? "No se ha generado un recurso"
              : indicators.lastGeneratedResource
          }
          label="Último recurso generado"
          type="alphabetic"
          loading={isLoading}
          style={{
            width: thirdWidth,
          }}
        />
      </View>
      {userProfile &&
      !userProfile.userPreferences.autoSync &&
      !indicators.sync ? (
        <InfoCard
          title="Sincronización de datos"
          description="Hay datos sin sincronizar toca el siguiente botón para sincronizar tus datos"
          buttonData={{
            onPress: syncIndicators,
            icon: "sync-outline",
            label: "Sincronizar indicadores",
            loading: isPending,
            loadingMessage: "Sincronizando datos...",
          }}
        />
      ) : null}
    </View>
  );
};

export default DashboardIndicatorPanel;
