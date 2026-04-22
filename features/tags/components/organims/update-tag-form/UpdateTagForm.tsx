import { useEffect } from "react";

import { Tag, TagType } from "@/features/tags/types";

import { useUpdateTagMutation } from "@/features/tags/hooks/mutations";
import { useForm, useTranslations } from "@/shared/hooks/core";

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
  const { isPending, mutate } = useUpdateTagMutation();

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
    actionCallback: () => {
      mutate(data, { onSuccess: () => onClosePopup() });
    },
    noReset: true,
  });

  const { t } = useTranslations();

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
              label={t(
                "tags_translations.update_tag_template.form_labels.name.label",
              )}
              icon="pricetag-outline"
              name="name"
              value={data.name}
              placeholder={t(
                "tags_translations.update_tag_template.form_labels.name.placeholder",
              )}
              errorMessage={getFieldErrors("name")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("name")}
            />
          </Form.Row.Item>
          <Form.Row.Item span={1}>
            <Form.MultiOptionInput<UpdateTagFormData, TagType>
              label={t(
                "tags_translations.update_tag_template.form_labels.type.label",
              )}
              name="type"
              value={data.type}
              errorMessage={getFieldErrors("type")?.join(", ")}
              onChange={handleChange}
            >
              <Form.MultiOptionInput.Option
                label={t(
                  "tags_translations.update_tag_template.form_labels.type.options.prompts",
                )}
                optionValue="prompt_tag"
                isSelected={data.type === "prompt_tag"}
              />
              <Form.MultiOptionInput.Option
                label={t(
                  "tags_translations.update_tag_template.form_labels.type.options.resources",
                )}
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
            label={t(
              "tags_translations.update_tag_template.form_labels.btn_update_tag",
            )}
            onPress={handleSubmit}
            loading={isPending}
            loadingMessage={t(
              "tags_translations.update_tag_template.form_loading_messages.updating_tag_msg",
            )}
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default UpdateTagForm;
