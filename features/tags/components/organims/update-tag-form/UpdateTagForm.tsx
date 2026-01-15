import { useEffect } from "react";

import { Tag, TagType } from "@/features/tags/types";

import { useUpdateTag } from "@/features/tags/hooks/core";
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
                "tags-translations.update-tag-template.form-labels.name.label"
              )}
              icon="pricetag-outline"
              name="name"
              value={data.name}
              placeholder={t(
                "tags-translations.update-tag-template.form-labels.name.placeholder"
              )}
              errorMessage={getFieldErrors("name")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("name")}
            />
          </Form.Row.Item>
          <Form.Row.Item span={1}>
            <Form.MultiOptionInput<UpdateTagFormData, TagType>
              label={t(
                "tags-translations.update-tag-template.form-labels.type.label"
              )}
              name="type"
              value={data.type}
              errorMessage={getFieldErrors("type")?.join(", ")}
              onChange={handleChange}
            >
              <Form.MultiOptionInput.Option
                label={t(
                  "tags-translations.update-tag-template.form-labels.type.options.prompts"
                )}
                optionValue="prompt_tag"
                isSelected={data.type === "prompt_tag"}
              />
              <Form.MultiOptionInput.Option
                label={t(
                  "tags-translations.update-tag-template.form-labels.type.options.resources"
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
              "tags-translations.update-tag-template.form-labels.btn-update-tag"
            )}
            onPress={handleSubmit}
            loading={isPending}
            loadingMessage={t(
              "tags-translations.update-tag-template.form-loading-messages.updating-tag-msg"
            )}
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default UpdateTagForm;
