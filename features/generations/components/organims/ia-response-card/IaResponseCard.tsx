import { ScrollView, View } from "react-native";

import { ResourceFormat } from "../../../types";

import { eventBus } from "@/core/events/EventBus";
import { AppColors, Spacing } from "@/shared/styles";

import { useSaveResourceFormLogic } from "@/features/generations/hooks/core";
import { useGenerateResourceMutation } from "@/features/generations/hooks/mutations";
import { useGenerationsStore } from "@/features/generations/hooks/store";
import {
  useBackgroundTaskRunner,
  useResponsive,
  useTranslations,
} from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";

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

import { dynamicStyles } from "./IaResponseCard.style";

interface IaResponseCardProps {
  format: ResourceFormat;
  iaGeneratedContent: string;
}

const IaResponseCard = ({
  format,
  iaGeneratedContent,
}: IaResponseCardProps) => {
  const size = useResponsive();
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
    paginatedTags,
    searchTagValue,
    onSearchTagValueChange,
    saveResourcePopUp,
    form,
    isTagSelectionMode,
    setIsTagSelectionMode,
  } = useSaveResourceFormLogic();
  const { t } = useTranslations();

  const viewerType =
    format.formatKey === "text"
      ? "text"
      : format.formatKey === "image"
        ? "image"
        : "table/chart";
  const styles = dynamicStyles(size);

  return (
    <>
      <PopUp
        title={
          isTagSelectionMode
            ? t(
                "generations_translations.ia_response_card_labels.select_tag_popup_labels.title",
              )
            : t(
                "generations_translations.ia_response_card_labels.save_resource_popup_labels.title",
              )
        }
        icon={isTagSelectionMode ? "pricetag-outline" : "add-outline"}
        isOpen={saveResourcePopUp.isOpen}
        onClose={() => {
          saveResourcePopUp.closePopUp();
        }}
        scrollable={!isTagSelectionMode}
      >
        {isTagSelectionMode ? (
          <ComposedDropdownOptionList<{
            tagId: string;
            type: "prompt_tag" | "resource_tag";
            name: string;
          }>
            ControlPanelComponent={
              <TagSelectionPanel
                tagType="resource_tag"
                searchValue={searchTagValue}
                onSearchChange={onSearchTagValueChange}
              />
            }
            infinitePaginationOptions={{
              ...paginatedTags,
              onRefetch: () =>
                eventBus.emit("tags.resourceType.refetch.requested", undefined),
              onEndReached: () => {
                if (
                  paginatedTags.hasNextPage &&
                  !paginatedTags.isFetchingNextPage
                )
                  eventBus.emit(
                    "tags.resourceType.fetchNextPage.requested",
                    undefined,
                  );
              },
            }}
            optionList={paginatedTags.tags}
            optionIdkey="tagId"
            optionLabelKey="name"
            searchInputPlaceholder={t(
              "generations_translations.ia_response_card_labels.select_tag_popup_labels.search_input_placeholder",
            )}
            selectedOption={selectedTag}
            onSelectOption={(option) => {
              form.handleChange("groupTag", option.tagId);
              setIsTagSelectionMode(false);
            }}
            FooterComponent={
              <Button
                label={t(
                  "generations_translations.ia_response_card_labels.select_tag_popup_labels.btn_cancel",
                )}
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
            onClosePopUp={saveResourcePopUp.closePopUp}
          />
        )}
      </PopUp>
      <View style={{ alignItems: "flex-end", gap: Spacing.spacing_xl }}>
        <Button
          icon="chevron-back-outline"
          label={t("generations_translations.ia_response_card_labels.btn_back")}
          variant="neutral"
          width="auto"
          onPress={clearAndRemoveSelectedGeneration}
        />
        <ScreenSection
          description={t(
            "generations_translations.ia_response_card_labels.description",
          )}
          title={t("generations_translations.ia_response_card_labels.title")}
          icon="star-outline"
        />
        <View style={styles.Container}>
          <View style={styles.Header}>
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
          <ScrollView horizontal contentContainerStyle={styles.Options}>
            <Button
              icon="save-outline"
              variant="neutral"
              width="auto"
              onPress={saveResourcePopUp.openPopUp}
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
                    await runBackgroundTask(
                      newTask,
                      async () => {
                        await mutateAsync(currentIaGeneration.data);
                      },
                      {
                        successNotification: {
                          title: t(
                            "generations_translations.ia_response_card_labels.generation_process_labels.success.title",
                          ),
                          message: `${t(
                            "generations_translations.ia_response_card_labels.generation_process_labels.success.message",
                          )} ${
                            currentIaGeneration.data.resourceType.other ??
                            currentIaGeneration.data.resourceType
                              .resourceTypeLabel
                          }`,
                        },
                        errorNotification: {
                          title: t(
                            "generations_translations.ia_response_card_labels.generation_process_labels.error.title",
                          ),
                          message: `${t(
                            "generations_translations.ia_response_card_labels.generation_process_labels.error.message",
                          )} ${
                            currentIaGeneration.data.resourceType.other ??
                            currentIaGeneration.data.resourceType
                              .resourceTypeLabel
                          }`,
                        },
                      },
                    );
                  },
                );
              }}
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
          label={t(
            "generations_translations.ia_response_card_labels.btn_generate_other_resource",
          )}
          variant="primary"
          width="100%"
          onPress={createAndSelectNewGeneration}
        />
      </View>
    </>
  );
};

export default IaResponseCard;
