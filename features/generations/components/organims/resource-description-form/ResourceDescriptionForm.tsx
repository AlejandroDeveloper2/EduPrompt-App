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
    setTagType,
  } = useSavePromptFormLogic(savePromptPopUp.closePopUp);

  return (
    <>
      <PopUp
        icon={isTagSelection ? "pricetag-outline" : "save-outline"}
        title={
          isTagSelection
            ? t(
                "generations_translations.resource_description_template.select_tag_popup_labels.title",
              )
            : t(
                "generations_translations.resource_description_template.save_prompt_popup_labels.title",
              )
        }
        isOpen={savePromptPopUp.isOpen}
        onClose={savePromptPopUp.closePopUp}
        scrollable={!isTagSelection}
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
                    undefined,
                  );
              },
            }}
            optionList={paginatedTags.tags}
            optionIdkey="tagId"
            optionLabelKey="name"
            searchInputPlaceholder={t(
              "generations_translations.resource_description_template.select_tag_popup_labels.search_input_placeholder",
            )}
            selectedOption={selectedTag}
            onSelectOption={(option) => {
              form.handleChange("tag", option.tagId);
              setIsTagSelection(false);
            }}
            FooterComponent={
              <Button
                label={t(
                  "generations_translations.resource_description_template.select_tag_popup_labels.btn_cancel",
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
            onClosePopUp={savePromptPopUp.closePopUp}
            setTagType={setTagType}
          />
        )}
      </PopUp>

      <PopUp
        icon={isTagSelection ? "pricetag-outline" : "chatbox-outline"}
        title={
          isTagSelection
            ? t(
                "generations_translations.resource_description_template.select_tag_popup_labels.title",
              )
            : t(
                "generations_translations.resource_description_template.select_prompt_popup_labels.title",
              )
        }
        isOpen={selectPromptPopUp.isOpen}
        onClose={selectPromptPopUp.closePopUp}
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
                    undefined,
                  );
              },
            }}
            optionList={paginatedTags.tags}
            optionIdkey="tagId"
            optionLabelKey="name"
            searchInputPlaceholder={t(
              "generations_translations.resource_description_template.select_tag_popup_labels.search_input_placeholder",
            )}
            selectedOption={selectedTag}
            onSelectOption={(option) => {
              form.handleChange("tag", option.tagId);
              setIsTagSelection(false);
            }}
            FooterComponent={
              <Button
                label={t(
                  "generations_translations.resource_description_template.select_tag_popup_labels.btn_cancel",
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
              "generations_translations.resource_description_template.select_prompt_popup_labels.search_input_placeholder",
            )}
            selectedOption={selectedPrompt}
            onSelectOption={(option) => {
              setSelectedPrompt(option);
              selectPromptPopUp.closePopUp();
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
                  "generations_translations.resource_description_template.form_labels.prompt_description.label",
                )}
                icon="chatbox-ellipses-outline"
                name="descriptionPrompt"
                value={data.descriptionPrompt}
                placeholder={t(
                  "generations_translations.resource_description_template.form_labels.prompt_description.placeholder",
                )}
                errorMessage={getFieldErrors("descriptionPrompt")?.join(", ")}
                onChange={handleChange}
                onClearInput={() => handleClearInput("descriptionPrompt")}
                onSavePrompt={() => {
                  form.setValues({ promptText: data.descriptionPrompt });
                  savePromptPopUp.openPopUp();
                }}
                onSearchPrompt={selectPromptPopUp.openPopUp}
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
                "generations_translations.resource_description_template.form_labels.btn_generate_resource",
              )}
              loading={isPending}
              disabled={
                currentIaGeneration
                  ? !currentIaGeneration.generationCompleted
                  : true
              }
              loadingMessage={t(
                "generations_translations.resource_description_template.form_loading_messages.generating_resource_msg",
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
                "generations_translations.resource_description_template.form_labels.btn_prev_step",
              )}
              onPress={() => {
                if (!currentIaGeneration) return;
                setGenerationStep(
                  currentIaGeneration.generationId,
                  "language_selection",
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
