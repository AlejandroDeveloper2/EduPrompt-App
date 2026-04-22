import { Tag } from "@/features/tags/types";

import { useTranslations } from "@/shared/hooks/core";

import { CreateResourceFormData } from "./validationSchema";

import { Form } from "@/shared/components/organims";

interface SaveResourceFormProps {
  isLoading: boolean;
  selectedTag: Tag | null;
  form: {
    formData: CreateResourceFormData;
    handleChange: (
      field: keyof CreateResourceFormData,
      value: string | number,
    ) => void;
    handleClearInput: (name: keyof CreateResourceFormData) => void;
    getFieldErrors: (
      fieldKey: keyof CreateResourceFormData,
    ) => string[] | undefined;
    handleSubmit: () => void;
  };
  onTagSelectionMode: () => void;
  onClosePopUp: () => void;
}

const SaveResourceForm = ({
  isLoading,
  selectedTag,
  form,
  onTagSelectionMode,
  onClosePopUp,
}: SaveResourceFormProps) => {
  const {
    formData,
    getFieldErrors,
    handleChange,
    handleClearInput,
    handleSubmit,
  } = form;

  const { t } = useTranslations();

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<CreateResourceFormData>
              label={t(
                "generations_translations.save_resource_form.form_labels.resource_title.label",
              )}
              icon="text-outline"
              name="title"
              value={formData.title}
              placeholder={t(
                "generations_translations.save_resource_form.form_labels.resource_title.placeholder",
              )}
              errorMessage={getFieldErrors("title")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("title")}
            />
          </Form.Row.Item>
        </Form.Row>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Dropdown<
              CreateResourceFormData,
              {
                tagId: string;
                type: "prompt_tag" | "resource_tag";
                name: string;
              }
            >
              name="groupTag"
              label={t(
                "generations_translations.save_resource_form.form_labels.group_tag.label",
              )}
              icon="pricetag-outline"
              placeholder={t(
                "generations_translations.save_resource_form.form_labels.group_tag.placeholder",
              )}
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
            icon="add-outline"
            label={t(
              "generations_translations.save_resource_form.form_labels.btn_save_resource",
            )}
            loading={isLoading}
            loadingMessage={t(
              "generations_translations.save_resource_form.form_loading_messages.saving_resource_msg",
            )}
            onPress={handleSubmit}
          />
        </Form.Row.Item>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="neutral"
            width="100%"
            icon="close-outline"
            label={t(
              "generations_translations.save_resource_form.form_labels.btn_cancel",
            )}
            onPress={onClosePopUp}
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default SaveResourceForm;
