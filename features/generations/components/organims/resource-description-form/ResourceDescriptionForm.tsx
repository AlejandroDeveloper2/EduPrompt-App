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
  } = useResourceDescriptionFormLogic();

  const { isLoading, tagsPagination, selectedTag, form } =
    useSavePromptFormLogic(
      data.descriptionPrompt,
      savePromptPopUp.onClosePopUp
    );

  return (
    <>
      <PopUp
        icon={isTagSelection ? "pricetag-outline" : "save-outline"}
        title={isTagSelection ? "Seleccionar etiqueta" : "Guardar prompt"}
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
            ControlPanelComponent={<TagSelectionPanel tagType="prompt_tag" />}
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
              form.handleChange("tag", option.tagId);
              setIsTagSelection(false);
            }}
            FooterComponent={
              <Button
                label="Cancelar selección"
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
        title={isTagSelection ? "Seleccionar etiqueta" : "Seleccionar prompt"}
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
            ControlPanelComponent={<TagSelectionPanel tagType="prompt_tag" />}
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
              form.handleChange("tag", option.tagId);
              setIsTagSelection(false);
            }}
            FooterComponent={
              <Button
                label="Cancelar selección"
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
            searchInputPlaceholder="Buscar prompt por titulo"
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
                label="Describe tu recurso (*)"
                icon="chatbox-ellipses-outline"
                name="descriptionPrompt"
                value={data.descriptionPrompt}
                placeholder="Describe tu recurso. Ejemplo: genera una guía para planificar mi clase de biología sobre animales invertebrados. Diseña la guía para una clase de 2 horas."
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
              label="Generar recurso"
              loading={isPending}
              disabled={
                currentIaGeneration
                  ? !currentIaGeneration.generationCompleted
                  : true
              }
              loadingMessage="Generando recurso..."
              onPress={handleSubmit}
            />
          </Form.Row.Item>
          <Form.Row.Item span={1}>
            <Form.Button
              variant="neutral"
              width="100%"
              icon="chevron-back-outline"
              label="Anterior"
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
