import { useEffect } from "react";

import { Tag, TagType } from "@/features/tags/types";

import { useUpdateTag } from "@/features/tags/hooks/core";
import { useForm } from "@/shared/hooks/core";

import { UpdateTagFormData, updateTagSchema } from "./validationSchema";

import { Form } from "@/shared/components/organims";

interface UpdateTagFormProps {
  selectedTag: Tag | null;
  onClosePopup: () => void;
}

const initialValues: UpdateTagFormData = {
  tagId: "",
  name: "",
  type: "prompt_tag",
};

const UpdateTagForm = ({ selectedTag, onClosePopup }: UpdateTagFormProps) => {
  const { isPending, editTag } = useUpdateTag();

  const {
    data,
    handleSubmit,
    handleChange,
    handleClearInput,
    getFieldErrors,
    setValues,
  } = useForm({
    initialValues,
    validationSchema: updateTagSchema,
    actionCallback: async () => {
      await editTag(data);
      onClosePopup();
    },
    noReset: true,
  });

  useEffect(() => {
    if (selectedTag) setValues({ ...selectedTag });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTag]);

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<UpdateTagFormData>
              label="Nombre"
              icon="pricetag-outline"
              name="name"
              value={data.name}
              placeholder="Nombre de la etiqueta"
              errorMessage={getFieldErrors("name")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("name")}
            />
          </Form.Row.Item>
          <Form.Row.Item span={1}>
            <Form.MultiOptionInput<UpdateTagFormData, TagType>
              label="Tipo"
              name="type"
              value={data.type}
              errorMessage={getFieldErrors("type")?.join(", ")}
              onChange={handleChange}
            >
              <Form.MultiOptionInput.Option
                label="Prompt"
                optionValue="prompt_tag"
                isSelected={data.type === "prompt_tag"}
              />
              <Form.MultiOptionInput.Option
                label="Recurso educativo"
                optionValue="resource_tag"
                isSelected={data.type === "resource_tag"}
              />
            </Form.MultiOptionInput>
          </Form.Row.Item>
        </Form.Row>
      </Form.Fields>
      <Form.Actions configRows={{ sm: 1, md: 1, lg: 1 }}>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="primary"
            width="100%"
            icon="pencil-outline"
            label="Actualizar etiqueta"
            onPress={handleSubmit}
            loading={isPending}
            loadingMessage="Actualizando etiqueta..."
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default UpdateTagForm;
