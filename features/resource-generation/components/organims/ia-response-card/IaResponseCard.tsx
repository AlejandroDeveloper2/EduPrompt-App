import { useMemo } from "react";
import { ScrollView, View } from "react-native";

import { ResourceFormat } from "../../../types";

import { AppColors, Spacing } from "@/shared/styles";

import { useGenerateResource } from "@/features/resource-generation/hooks/mutations";
import { useGenerationsStore } from "@/features/resource-generation/hooks/store";
import { useBackgroundTaskRunner } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { getResourcePrice } from "@/features/resource-generation/helpers";
import { copyToClipboard } from "@/shared/utils";

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

  const {
    createAndSelectNewGeneration,
    editSelectedGeneration,
    clearAndRemoveSelectedGeneration,
    executeIaGeneration,
  } = useGenerationsStore();

  const { mutateAsync, isPending, data } = useGenerateResource();
  const { runBackgroundTask } = useBackgroundTaskRunner();
  const userProfile = useEventbusValue("userProfile.user.updated", null);

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
    <View style={{ alignItems: "flex-end", gap: Spacing.spacing_xl }}>
      <Button
        icon="chevron-back-outline"
        label="Volver"
        variant="neutral"
        width="auto"
        onPress={clearAndRemoveSelectedGeneration}
      />
      <ScreenSection
        description="Aquí tienes el recurso solicitado, puedes guardar el recurso en vista previa, descargarlo,  generarlo de nuevo o ajustar la información para generar una mejor versión."
        title="Resultado"
        icon="star-outline"
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
            onPress={editSelectedGeneration}
          />
          <Button
            icon="reload-outline"
            variant="neutral"
            width="auto"
            loading={isPending}
            onPress={() => {
              executeIaGeneration(
                (formatKey) => {
                  return userProfile
                    ? userProfile.tokenCoins >= getResourcePrice(formatKey)
                    : false;
                },
                async (newTask, currentIaGeneration) => {
                  await runBackgroundTask(newTask, async () => {
                    await mutateAsync(currentIaGeneration.data);
                  });
                }
              );
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
