import { TagType } from "@/features/tags/types";

import { eventBus } from "@/core/events/EventBus";

import { useForm } from "@/shared/hooks/core";
import { useEventBusToggle } from "@/shared/hooks/events";

import { CreateTagData, createTagSchema } from "./validationSchema";

import Form from "../form/Form";

interface CreateTagFormProps {
  tagType: TagType;
}

const initialValues: CreateTagData = {
  name: "",
};

const CreateTagForm = ({ tagType }: CreateTagFormProps) => {
  const isLoading = useEventBusToggle("tags.createTag.started", [
    "tags.createTag.completed",
    "tags.createTag.failed",
  ]);

  const { data, handleSubmit, handleChange, handleClearInput, getFieldErrors } =
    useForm({
      initialValues,
      validationSchema: createTagSchema,
      actionCallback: () => {
        eventBus.emit("tags.createTag.requested", {
          name: data.name,
          type: tagType,
        });
      },
    });

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<CreateTagData>
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
        </Form.Row>
      </Form.Fields>

      <Form.Actions configRows={{ sm: 1, md: 1, lg: 1 }}>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="primary"
            width="auto"
            icon="add-outline"
            onPress={handleSubmit}
            loading={isLoading}
            loadingMessage="Agregando..."
            label="Agregar etiqueta"
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default CreateTagForm;
