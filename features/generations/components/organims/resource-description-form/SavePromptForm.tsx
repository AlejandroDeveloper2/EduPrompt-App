import { Tag } from "@/features/tags/types";

import { SavePromptFormData } from "./validationSchema";

import { Form } from "@/shared/components/organims";

interface SavePromptFormProps {
  isLoading: boolean;
  selectedTag: Tag | null;
  form: {
    data: {
      promptTitle: string;
      promptText: string;
      tag: string;
    };
    handleChange: (
      field: keyof {
        promptTitle: string;
        promptText: string;
        tag: string;
      },
      value: string | number
    ) => void;
    handleClearInput: (
      name: keyof {
        promptTitle: string;
        promptText: string;
        tag: string;
      }
    ) => void;
    getFieldErrors: (
      fieldKey: keyof { promptTitle: string; promptText: string; tag: string }
    ) => string[] | undefined;
    handleSubmit: () => void;
  };
  onTagSelectionMode: () => void;
  onClosePopUp: () => void;
}

const SavePromptForm = ({
  isLoading,
  selectedTag,
  form,
  onTagSelectionMode,
  onClosePopUp,
}: SavePromptFormProps) => {
  const { data, getFieldErrors, handleChange, handleClearInput, handleSubmit } =
    form;
  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<SavePromptFormData>
              label="Titulo (*)"
              icon="text-outline"
              name="promptTitle"
              value={data.promptTitle}
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
            />
          </Form.Row.Item>
        </Form.Row>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Dropdown<
              SavePromptFormData,
              {
                tagId: string;
                type: "prompt_tag" | "resource_tag";
                name: string;
              }
            >
              name="tag"
              label="Etiqueta (*)"
              icon="pricetag-outline"
              placeholder="Seleccione una opción"
              selectedOption={selectedTag}
              optionValueKey="name"
              displayDropdownOptions={onTagSelectionMode}
              errorMessage={getFieldErrors("tag")?.join(", ")}
              clearSelectedOption={() => handleClearInput("tag")}
            />
          </Form.Row.Item>
        </Form.Row>
      </Form.Fields>
      <Form.Actions configRows={{ sm: 1, md: 1, lg: 2 }}>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="primary"
            width="100%"
            icon="add-outline"
            label="Guardar prompt"
            loading={isLoading}
            loadingMessage="Guardando..."
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
