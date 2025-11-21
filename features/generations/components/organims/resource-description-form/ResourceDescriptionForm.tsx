import { ResourceDescriptionFormData } from "./validationSchema";

import { useResourceDescriptionFormLogic } from "@/features/generations/hooks/core";

import { Typography } from "@/shared/components/atoms";
import { Form, PopUp } from "@/shared/components/organims";
import SavePromptForm from "./SavePromptForm";

const ResourceDescriptionForm = () => {
  const {
    currentIaGeneration,
    setGenerationStep,
    form: {
      data,
      isPending,
      getFieldErrors,
      handleChange,
      handleClearInput,
      handleSubmit,
    },
    popUps: { savePromptPopUp, selectPromptPopUp },
  } = useResourceDescriptionFormLogic();

  return (
    <>
      <PopUp
        icon="save-outline"
        title="Guardar prompt"
        isPopUpMounted={savePromptPopUp.isPopUpMounted}
        gesture={savePromptPopUp.dragGesture}
        animatedPopUpStyle={savePromptPopUp.animatedPopUpStyle}
        onClosePopUp={savePromptPopUp.onClosePopUp}
        style={{ maxHeight: "auto" }}
      >
        <SavePromptForm
          promptText={data.descriptionPrompt}
          onClosePopUp={savePromptPopUp.onClosePopUp}
        />
      </PopUp>

      <PopUp
        icon="search-outline"
        title="Seleccionar prompt"
        isPopUpMounted={selectPromptPopUp.isPopUpMounted}
        gesture={selectPromptPopUp.dragGesture}
        animatedPopUpStyle={selectPromptPopUp.animatedPopUpStyle}
        onClosePopUp={selectPromptPopUp.onClosePopUp}
      >
        <Typography
          text={"List"}
          weight={"bold"}
          type={"display"}
          textAlign={"center"}
          color={""}
          width="auto"
        />
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
                onGeneratePrompt={() => {}}
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
