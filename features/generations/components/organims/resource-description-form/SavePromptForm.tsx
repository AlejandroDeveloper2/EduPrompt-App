import { Tag } from "@/features/tags/types";

import { useTranslations } from "@/shared/hooks/core";

import { SavePromptFormData } from "./validationSchema";

import { Form } from "@/shared/components/organims";

interface SavePromptFormProps {
  isLoading: boolean;
  selectedTag: Tag | null;
  setTagType: (type: "promptType" | "resourceType") => void;
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
      value: string | number,
    ) => void;
    handleClearInput: (
      name: keyof {
        promptTitle: string;
        promptText: string;
        tag: string;
      },
    ) => void;
    getFieldErrors: (
      fieldKey: keyof { promptTitle: string; promptText: string; tag: string },
    ) => string[] | undefined;
    handleSubmit: () => void;
  };
  onTagSelectionMode: () => void;
  onClosePopUp: () => void;
}

const SavePromptForm = ({
  isLoading,
  selectedTag,
  setTagType,
  form,
  onTagSelectionMode,
  onClosePopUp,
}: SavePromptFormProps) => {
  const { data, getFieldErrors, handleChange, handleClearInput, handleSubmit } =
    form;

  const { t } = useTranslations();

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<SavePromptFormData>
              label={t(
                "generations_translations.save_prompt_template.form_labels.prompt_title.label",
              )}
              icon="text-outline"
              name="promptTitle"
              value={data.promptTitle}
              placeholder={t(
                "generations_translations.save_prompt_template.form_labels.prompt_title.placeholder",
              )}
              errorMessage={getFieldErrors("promptTitle")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("promptTitle")}
            />
          </Form.Row.Item>
        </Form.Row>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.PromptInput<SavePromptFormData>
              label={t(
                "generations_translations.save_prompt_template.form_labels.prompt_body.label",
              )}
              icon="chatbox-ellipses-outline"
              name="promptText"
              value={data.promptText}
              placeholder={t(
                "generations_translations.save_prompt_template.form_labels.prompt_body.placeholder",
              )}
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
              label={t(
                "generations_translations.save_prompt_template.form_labels.tag.label",
              )}
              icon="pricetag-outline"
              placeholder={t(
                "generations_translations.save_prompt_template.form_labels.tag.placeholder",
              )}
              selectedOption={selectedTag}
              optionValueKey="name"
              displayDropdownOptions={() => {
                setTagType("promptType");
                onTagSelectionMode();
              }}
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
            label={t(
              "generations_translations.save_prompt_template.form_labels.btn_save_prompt",
            )}
            loading={isLoading}
            loadingMessage={t(
              "generations_translations.save_prompt_template.form_loading_messages.saving_prompt_msg",
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
              "generations_translations.save_prompt_template.form_labels.btn_cancel",
            )}
            onPress={onClosePopUp}
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default SavePromptForm;
