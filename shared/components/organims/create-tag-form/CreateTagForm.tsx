import { TagType } from "@/features/tags/types";

import { eventBus } from "@/core/events/EventBus";

import { useForm, useTranslations } from "@/shared/hooks/core";
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

  const { t } = useTranslations();

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<CreateTagData>
              label={t(
                "common-translations.create-tag-form.form-labels.name.label"
              )}
              icon="pricetag-outline"
              name="name"
              value={data.name}
              placeholder={t(
                "common-translations.create-tag-form.form-labels.name.placeholder"
              )}
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
            loadingMessage={t(
              "common-translations.create-tag-form.form-loading-messages.adding-tag-msg"
            )}
            label={t(
              "common-translations.create-tag-form.form-labels.btn-add-tag"
            )}
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default CreateTagForm;
