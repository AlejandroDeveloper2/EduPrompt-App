/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { eventBus } from "@/core/events/EventBus";

import { useForm } from "@/shared/hooks/core";
import { useEventBusToggle } from "@/shared/hooks/events";

import { SavePromptFormData, savePromptFormSchema } from "./validationSchema";

import { Form } from "@/shared/components/organims";

interface SavePromptFormProps {
  promptText: string;
  onClosePopUp: () => void;
}

const initialValues: SavePromptFormData = {
  promptTitle: "",
  promptText: "",
  tag: "",
};

const SavePromptForm = ({ promptText, onClosePopUp }: SavePromptFormProps) => {
  const {
    data,
    handleChange,
    handleClearInput,
    getFieldErrors,
    handleSubmit,
    setValues,
  } = useForm({
    initialValues,
    validationSchema: savePromptFormSchema,
    actionCallback: () => {
      eventBus.emit("prompts.savePrompt.requested", data);
    },
  });

  const isLoading = useEventBusToggle("prompts.savePrompt.started", [
    "prompts.savePrompt.completed",
    "prompts.savePrompt.failed",
  ]);

  useEffect(() => {
    setValues({ promptText });
  }, [promptText]);

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<SavePromptFormData>
              label="Titulo (*)"
              icon="text-outline"
              name="promptTitle"
              value={data.promptText}
              placeholder="Digita el titulo del prompt"
              errorMessage={getFieldErrors("promptTitle")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("promptTitle")}
            />
          </Form.Row.Item>
        </Form.Row>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.PromptInput<SavePromptFormData>
              label="Cuerpo del prompt (*)"
              icon="chatbox-ellipses-outline"
              name="promptText"
              value={data.promptText}
              placeholder="Describe tu recurso. Ejemplo: genera una guía para planificar mi clase de biología sobre animales invertebrados. Diseña la guía para una clase de 2 horas."
              errorMessage={getFieldErrors("promptText")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("promptText")}
              onGeneratePrompt={() => {}}
            />
          </Form.Row.Item>
        </Form.Row>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<SavePromptFormData>
              label="Etiqueta (*)"
              icon="pricetag-outline"
              name="tag"
              value={data.tag}
              placeholder="Digita la etiqueta del prompt"
              errorMessage={getFieldErrors("tag")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("tag")}
            />
          </Form.Row.Item>
        </Form.Row>
      </Form.Fields>
      <Form.Actions configRows={{ sm: 1, md: 1, lg: 2 }}>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="primary"
            width="100%"
            icon="bulb-outline"
            label="Generar"
            loading={isLoading}
            loadingMessage="Generando..."
            onPress={handleSubmit}
          />
        </Form.Row.Item>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="neutral"
            width="100%"
            icon="close-outline"
            label="Cancelar"
            onPress={onClosePopUp}
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default SavePromptForm;
