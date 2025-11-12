import { useMemo } from "react";
import { ScrollView, View } from "react-native";

import { ResourceFormat } from "../../../types";

import { AppColors, Spacing } from "@/shared/styles";

import { useGenerateResource } from "@/features/resource-generation/hooks/mutations";
import { useGenerationsStore } from "@/features/resource-generation/hooks/store";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { Badge, ScreenSection, Typography } from "@/shared/components/atoms";
import { Button, ResourceViewer } from "@/shared/components/molecules";

import { copyToClipboard } from "@/shared/utils";
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
  const {
    currentIaGeneration,
    createAndSelectNewGeneration,
    setGenerationStep,
    getIaGeneration,
  } = useGenerationsStore();
  const { mutate, isPending, data } = useGenerateResource();

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
            text={
              data
                ? new Date(data.generationDate).toLocaleDateString()
                : new Date().toLocaleDateString()
            }
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
            onPress={() => {
              if (!currentIaGeneration) return;
              setGenerationStep(
                currentIaGeneration.generationId,
                "resource_type_selection"
              );
              getIaGeneration(currentIaGeneration.generationId);
            }}
          />
          <Button
            icon="reload-outline"
            variant="neutral"
            width="auto"
            loading={isPending}
            onPress={() => {
              if (!currentIaGeneration) return;
              mutate(currentIaGeneration.data);
            }}
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
            onPress={() => copyToClipboard(iaGeneratedContent)}
          />
        </ScrollView>
      </View>
      <Button
        icon="bulb-outline"
        label="Generar otro recurso"
        variant="primary"
        width="100%"
        onPress={createAndSelectNewGeneration}
      />
    </View>
  );
};

export default IaResponseCard;
