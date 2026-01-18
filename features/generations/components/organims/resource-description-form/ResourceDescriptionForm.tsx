import { Prompt } from "@/features/prompts/types";

import { eventBus } from "@/core/events/EventBus";

import { Spacing } from "@/shared/styles";

import { ResourceDescriptionFormData } from "./validationSchema";

import {
  useResourceDescriptionFormLogic,
  useSavePromptFormLogic,
} from "@/features/generations/hooks/core";

import { Button } from "@/shared/components/molecules";
import {
  ComposedDropdownOptionList,
  Form,
  PopUp,
  TagSelectionPanel,
} from "@/shared/components/organims";
import PromptSelectionPanel from "../prompt-selection-panel/PromptSelectionPanel";
import SavePromptForm from "./SavePromptForm";

const ResourceDescriptionForm = () => {
  const {
    currentIaGeneration,
    setGenerationStep,
    isTagSelection,
    setIsTagSelection,
    selectedPrompt,
    setSelectedPrompt,
    form: {
      data,
      isPending,
      getFieldErrors,
      handleChange,
      handleClearInput,
      handleSubmit,
    },
    popUps: { savePromptPopUp, selectPromptPopUp },
    paginatedPrompts,
    t,
  } = useResourceDescriptionFormLogic();

  const {
    isLoading,
    paginatedTags,
    searchTagValue,
    onSearchTagValueChange,
    selectedTag,
    form,
  } = useSavePromptFormLogic(
    data.descriptionPrompt,
    savePromptPopUp.onClosePopUp
  );

  return (
    <>
      <PopUp
        icon={isTagSelection ? "pricetag-outline" : "save-outline"}
        title={
          isTagSelection
            ? t(
                "generations-translations.resource-description-template.select-tag-popup-labels.title"
              )
            : t(
                "generations-translations.resource-description-template.save-prompt-popup-labels.title"
              )
        }
        isPopUpMounted={savePromptPopUp.isPopUpMounted}
        gesture={savePromptPopUp.dragGesture}
        animatedPopUpStyle={savePromptPopUp.animatedPopUpStyle}
        onClosePopUp={savePromptPopUp.onClosePopUp}
        style={{ maxHeight: "auto" }}
      >
        {isTagSelection ? (
          <ComposedDropdownOptionList<{
            tagId: string;
            type: "prompt_tag" | "resource_tag";
            name: string;
          }>
            ControlPanelComponent={
              <TagSelectionPanel
                tagType="prompt_tag"
                searchValue={searchTagValue}
                onSearchChange={onSearchTagValueChange}
              />
            }
            infinitePaginationOptions={{
              ...paginatedTags,
              onRefetch: () =>
                eventBus.emit("tags.promptType.fetch", undefined),
              onEndReached: () => {
                if (
                  paginatedTags.hasNextPage &&
                  !paginatedTags.isFetchingNextPage
                )
                  eventBus.emit(
                    "tags.promptType.fetchNextPage.requested",
                    undefined
                  );
              },
            }}
            optionList={paginatedTags.tags}
            optionIdkey="tagId"
            optionLabelKey="name"
            searchInputPlaceholder={t(
              "generations-translations.resource-description-template.select-tag-popup-labels.search-input-placeholder"
            )}
            selectedOption={selectedTag}
            onSelectOption={(option) => {
              form.handleChange("tag", option.tagId);
              setIsTagSelection(false);
            }}
            FooterComponent={
              <Button
                label={t(
                  "generations-translations.resource-description-template.select-tag-popup-labels.btn-cancel"
                )}
                icon="close-outline"
                width="100%"
                variant="neutral"
                onPress={() => setIsTagSelection(false)}
                style={{ marginVertical: Spacing.spacing_xl }}
              />
            }
          />
        ) : (
          <SavePromptForm
            isLoading={isLoading}
            selectedTag={selectedTag}
            form={form}
            onTagSelectionMode={() => setIsTagSelection(true)}
            onClosePopUp={savePromptPopUp.onClosePopUp}
          />
        )}
      </PopUp>

      <PopUp
        icon={isTagSelection ? "pricetag-outline" : "chatbox-outline"}
        title={
          isTagSelection
            ? t(
                "generations-translations.resource-description-template.select-tag-popup-labels.title"
              )
            : t(
                "generations-translations.resource-description-template.select-prompt-popup-labels.title"
              )
        }
        isPopUpMounted={selectPromptPopUp.isPopUpMounted}
        gesture={selectPromptPopUp.dragGesture}
        animatedPopUpStyle={selectPromptPopUp.animatedPopUpStyle}
        onClosePopUp={selectPromptPopUp.onClosePopUp}
      >
        {isTagSelection ? (
          <ComposedDropdownOptionList<{
            tagId: string;
            type: "prompt_tag" | "resource_tag";
            name: string;
          }>
            ControlPanelComponent={
              <TagSelectionPanel
                tagType="prompt_tag"
                searchValue={searchTagValue}
                onSearchChange={onSearchTagValueChange}
              />
            }
            infinitePaginationOptions={{
              ...paginatedTags,
              onRefetch: () =>
                eventBus.emit("tags.promptType.refetch.requested", undefined),
              onEndReached: () => {
                if (
                  paginatedTags.hasNextPage &&
                  !paginatedTags.isFetchingNextPage
                )
                  eventBus.emit(
                    "tags.promptType.fetchNextPage.requested",
                    undefined
                  );
              },
            }}
            optionList={paginatedTags.tags}
            optionIdkey="tagId"
            optionLabelKey="name"
            searchInputPlaceholder={t(
              "generations-translations.resource-description-template.select-tag-popup-labels.search-input-placeholder"
            )}
            selectedOption={selectedTag}
            onSelectOption={(option) => {
              form.handleChange("tag", option.tagId);
              setIsTagSelection(false);
            }}
            FooterComponent={
              <Button
                label={t(
                  "generations-translations.resource-description-template.select-tag-popup-labels.btn-cancel"
                )}
                icon="close-outline"
                width="100%"
                variant="neutral"
                onPress={() => setIsTagSelection(false)}
                style={{ marginVertical: Spacing.spacing_xl }}
              />
            }
          />
        ) : (
          <ComposedDropdownOptionList<Prompt>
            ControlPanelComponent={
              <PromptSelectionPanel
                isTagSelection={isTagSelection}
                enableTagSelection={() => setIsTagSelection(true)}
              />
            }
            infinitePaginationOptions={{
              ...paginatedPrompts,
              onRefetch: () =>
                eventBus.emit("prompts.refetch.requested", undefined),
              onEndReached: () => {
                if (
                  paginatedPrompts.hasNextPage &&
                  !paginatedPrompts.isFetchingNextPage
                )
                  eventBus.emit("prompts.fetchNextPage.requested", undefined);
              },
            }}
            optionList={paginatedPrompts.prompts}
            optionIdkey="promptId"
            optionLabelKey="promptTitle"
            searchInputPlaceholder={t(
              "generations-translations.resource-description-template.select-prompt-popup-labels.search-input-placeholder"
            )}
            selectedOption={selectedPrompt}
            onSelectOption={(option) => {
              setSelectedPrompt(option);
              selectPromptPopUp.onClosePopUp();
            }}
          />
        )}
      </PopUp>
      <Form>
        <Form.Fields>
          <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
            <Form.Row.Item span={1}>
              <Form.PromptInput<ResourceDescriptionFormData>
                label={t(
                  "generations-translations.resource-description-template.form-labels.prompt-description.label"
                )}
                icon="chatbox-ellipses-outline"
                name="descriptionPrompt"
                value={data.descriptionPrompt}
                placeholder={t(
                  "generations-translations.resource-description-template.form-labels.prompt-description.placeholder"
                )}
                errorMessage={getFieldErrors("descriptionPrompt")?.join(", ")}
                onChange={handleChange}
                onClearInput={() => handleClearInput("descriptionPrompt")}
                onSavePrompt={savePromptPopUp.onOpenPopUp}
                onSearchPrompt={selectPromptPopUp.onOpenPopUp}
              />
            </Form.Row.Item>
          </Form.Row>
        </Form.Fields>
        <Form.Actions configRows={{ sm: 1, md: 2, lg: 2 }}>
          <Form.Row.Item span={1}>
            <Form.Button
              variant="primary"
              width="100%"
              icon="bulb-outline"
              label={t(
                "generations-translations.resource-description-template.form-labels.btn-generate-resource"
              )}
              loading={isPending}
              disabled={
                currentIaGeneration
                  ? !currentIaGeneration.generationCompleted
                  : true
              }
              loadingMessage={t(
                "generations-translations.resource-description-template.form-loading-messages.generating-resource-msg"
              )}
              onPress={handleSubmit}
            />
          </Form.Row.Item>
          <Form.Row.Item span={1}>
            <Form.Button
              variant="neutral"
              width="100%"
              icon="chevron-back-outline"
              label={t(
                "generations-translations.resource-description-template.form-labels.btn-prev-step"
              )}
              onPress={() => {
                if (!currentIaGeneration) return;
                setGenerationStep(
                  currentIaGeneration.generationId,
                  "language_selection"
                );
              }}
            />
          </Form.Row.Item>
        </Form.Actions>
      </Form>
    </>
  );
};

export default ResourceDescriptionForm;
