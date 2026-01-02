import { useMemo } from "react";
import { ScrollView, View } from "react-native";

import { ResourceFormat } from "../../../types";

import { eventBus } from "@/core/events/EventBus";
import { AppColors, Spacing } from "@/shared/styles";

import { useSaveResourceFormLogic } from "@/features/generations/hooks/core";
import { useGenerateResourceMutation } from "@/features/generations/hooks/mutations";
import { useGenerationsStore } from "@/features/generations/hooks/store";
import { useBackgroundTaskRunner } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { getResourcePrice } from "@/features/generations/helpers";
import { copyToClipboard } from "@/shared/utils";

import { Badge, ScreenSection, Typography } from "@/shared/components/atoms";
import { Button, ResourceViewer } from "@/shared/components/molecules";
import {
  ComposedDropdownOptionList,
  PopUp,
  TagSelectionPanel,
} from "@/shared/components/organims";
import SaveResourceForm from "../save-resource-form/SaveResourceForm";

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

  const { mutateAsync, isPending, data } = useGenerateResourceMutation();
  const { runBackgroundTask } = useBackgroundTaskRunner();
  const userProfile = useEventbusValue("userProfile.user.updated", null);
  const {
    isLoading,
    selectedTag,
    tagsPagination,
    saveResourcePopUp,
    form,
    isTagSelectionMode,
    setIsTagSelectionMode,
  } = useSaveResourceFormLogic();

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
    <>
      <PopUp
        title={isTagSelectionMode ? "Seleccionar etiqueta" : "Guardar recurso"}
        icon={isTagSelectionMode ? "pricetag-outline" : "add-outline"}
        isPopUpMounted={saveResourcePopUp.isPopUpMounted}
        gesture={saveResourcePopUp.dragGesture}
        animatedPopUpStyle={saveResourcePopUp.animatedPopUpStyle}
        style={{ maxHeight: "auto" }}
        onClosePopUp={() => {
          saveResourcePopUp.onClosePopUp();
        }}
      >
        {isTagSelectionMode ? (
          <ComposedDropdownOptionList<{
            tagId: string;
            type: "prompt_tag" | "resource_tag";
            name: string;
          }>
            ControlPanelComponent={<TagSelectionPanel tagType="resource_tag" />}
            infinitePaginationOptions={{
              ...tagsPagination,
              onRefetch: () =>
                eventBus.emit("tags.refetch.requested", undefined),
              onEndReached: () => {
                if (
                  tagsPagination.hasNextPage &&
                  !tagsPagination.isFetchingNextPage
                )
                  eventBus.emit("tags.fetchNextPage.requested", undefined);
              },
            }}
            optionList={tagsPagination.tags}
            optionIdkey="tagId"
            optionLabelKey="name"
            searchInputPlaceholder="Buscar etiqueta por nombre"
            selectedOption={selectedTag}
            onSelectOption={(option) => {
              form.handleChange("groupTag", option.tagId);
              setIsTagSelectionMode(false);
            }}
            FooterComponent={
              <Button
                label="Cancelar selección"
                icon="close-outline"
                width="100%"
                variant="neutral"
                onPress={() => setIsTagSelectionMode(false)}
                style={{ marginVertical: Spacing.spacing_xl }}
              />
            }
          />
        ) : (
          <SaveResourceForm
            isLoading={isLoading}
            selectedTag={selectedTag}
            form={form}
            onTagSelectionMode={() => setIsTagSelectionMode(true)}
            onClosePopUp={saveResourcePopUp.onClosePopUp}
          />
        )}
      </PopUp>
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
              onPress={saveResourcePopUp.onOpenPopUp}
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
    </>
  );
};

export default IaResponseCard;
