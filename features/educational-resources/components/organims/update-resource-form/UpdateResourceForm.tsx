import { UpdateResourceFormProps } from "./types";

import { UpdateResourceFormData } from "./validateSchema";

import { Form } from "@/shared/components/organims";

const UpdateResourceForm = ({
  isLoading,
  selectedTag,
  form,
  onTagSelectionMode,
  onClosePopUp,
}: UpdateResourceFormProps) => {
  const { data, getFieldErrors, handleChange, handleClearInput, handleSubmit } =
    form;

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<UpdateResourceFormData>
              label="Titulo (*)"
              icon="text-outline"
              name="title"
              value={data.title}
              placeholder="Digita el titulo del recurso"
              errorMessage={getFieldErrors("title")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("title")}
            />
          </Form.Row.Item>
        </Form.Row>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Dropdown<
              UpdateResourceFormData,
              {
                tagId: string;
                type: "prompt_tag" | "resource_tag";
                name: string;
              }
            >
              name="groupTag"
              label="Etiqueta (*)"
              icon="pricetag-outline"
              placeholder="Seleccione una opción"
              selectedOption={selectedTag}
              optionValueKey="name"
              displayDropdownOptions={onTagSelectionMode}
              errorMessage={getFieldErrors("groupTag")?.join(", ")}
              clearSelectedOption={() => handleClearInput("groupTag")}
            />
          </Form.Row.Item>
        </Form.Row>
      </Form.Fields>
      <Form.Actions configRows={{ sm: 1, md: 1, lg: 2 }}>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="primary"
            width="100%"
            icon="pencil-outline"
            label="Actualizar recurso"
            loading={isLoading}
            loadingMessage="Actualizando..."
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

export default UpdateResourceForm;
