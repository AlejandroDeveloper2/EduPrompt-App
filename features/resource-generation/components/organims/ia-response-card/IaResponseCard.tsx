import { useMemo } from "react";
import { ScrollView, View } from "react-native";

import { ResourceFormat } from "../../../types";

import { AppColors, Spacing } from "@/shared/styles";

import { useGenerationsStore } from "@/features/resource-generation/hooks/store";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { Badge, ScreenSection, Typography } from "@/shared/components/atoms";
import { Button, ResourceViewer } from "@/shared/components/molecules";

import { IaResponseCardStyle } from "./IaResponseCard.style";

interface IaResponseCardProps {
  format: ResourceFormat;
  iaGeneratedContent: string;
}

const IaResponseCard = ({
  format,
  iaGeneratedContent,
}: IaResponseCardProps) => {
  const size = useScreenDimensionsStore();
  const { clearSelectedGeneration } = useGenerationsStore();

  const viewerType = useMemo(
    () =>
      format.formatKey === "text"
        ? "text"
        : format.formatKey === "image"
        ? "image"
        : "table/chart",
    [format]
  );

  const iaResponseCardStyle = IaResponseCardStyle(size);

  return (
    <View style={{ alignItems: "center", gap: Spacing.spacing_xl }}>
      <ScreenSection
        description="Genera tus recursos educativos aquí. Puedes generar varios recursos simultáneamente ahora mismo!. Toca el botón de abajo y comienza ahora."
        title="Generar recurso"
        icon="bulb-outline"
      />
      <View style={iaResponseCardStyle.Container}>
        <View style={iaResponseCardStyle.Header}>
          <Badge label={format.formatLabel} variant="primary" />
          <Typography
            text={new Date().toLocaleDateString()}
            weight="regular"
            type="caption"
            textAlign="center"
            color={AppColors.neutral[600]}
            width="auto"
            icon="calendar-outline"
          />
        </View>
        <ResourceViewer
          viewerType={viewerType}
          content={iaGeneratedContent}
          scroll={false}
        />
        <ScrollView
          horizontal
          contentContainerStyle={iaResponseCardStyle.Options}
        >
          <Button
            icon="save-outline"
            variant="neutral"
            width="auto"
            onPress={() => {}}
          />
          <Button
            icon="pencil-outline"
            variant="neutral"
            width="auto"
            onPress={() => {}}
          />
          <Button
            icon="reload-outline"
            variant="neutral"
            width="auto"
            onPress={() => {}}
          />
          <Button
            icon="download-outline"
            variant="neutral"
            width="auto"
            onPress={() => {}}
          />
          <Button
            icon="copy-outline"
            variant="neutral"
            width="auto"
            disabled={format.formatKey !== "text"}
            onPress={() => {}}
          />
        </ScrollView>
      </View>
      <Button
        icon="bulb-outline"
        label="Generar otro recurso"
        variant="primary"
        width="100%"
        onPress={clearSelectedGeneration}
      />
    </View>
  );
};

export default IaResponseCard;
