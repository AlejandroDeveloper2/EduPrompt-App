import { useWindowDimensions, View } from "react-native";

import { Typography } from "@/shared/components/atoms";
import { DashboardIndicator } from "../../molecules";

import { AppColors } from "@/shared/styles";

import { useEventbusValue } from "@/shared/hooks/events";
import { useScreenDimensionsStore } from "@/shared/hooks/store";
import { useIndicatorPanelStore } from "../../../hooks/store";

import { getIndicatorPanelGrid } from "@/shared/utils";

import { DashboardIndicatorPanelStyle } from "./DashboardIndicatorPanel.style";

const DashboardIndicatorPanel = () => {
  const size = useScreenDimensionsStore();
  const { width } = useWindowDimensions();
  const { generatedResources, usedTokens, lastGeneratedResource } =
    useIndicatorPanelStore();
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
          value={`${generatedResources}`}
          label="Recursos generados"
          type="numeric"
          style={{
            width: firstWidth,
          }}
        />
        <DashboardIndicator
          icon="hardware-chip-outline"
          value={`${usedTokens}/${userProfile?.tokenCoins}`}
          label="Tokens usados"
          type="numeric"
          style={{
            width: firstWidth,
          }}
        />

        <DashboardIndicator
          icon="download-outline"
          value={"0"}
          label="Recursos descargados"
          type="numeric"
          style={{
            width: firstWidth,
          }}
        />
        <DashboardIndicator
          icon="save-outline"
          value={"0"}
          label="Recursos guardados"
          type="numeric"
          style={{
            width: secondWidth,
          }}
        />
        <DashboardIndicator
          icon="watch-outline"
          value={
            lastGeneratedResource.length === 0
              ? "No se ha generado un recurso"
              : lastGeneratedResource
          }
          label="Último recurso generado"
          type="alphabetic"
          style={{
            width: thirdWidth,
          }}
        />
      </View>
    </View>
  );
};

export default DashboardIndicatorPanel;
