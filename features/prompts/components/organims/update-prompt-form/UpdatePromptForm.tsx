import { Prompt } from "@/features/prompts/types";
import { Tag } from "@/features/tags/types";

import { useTranslations } from "@/shared/hooks/core";

import { UpdatePromptFormData } from "./validationSchema";

import { Form } from "@/shared/components/organims";

interface UpdatePromptFormProps {
  isLoading: boolean;
  selectedTag: Tag | null;
  form: {
    data: Omit<Prompt, "sync">;
    handleChange: (
      field: keyof Omit<Prompt, "sync">,
      value: string | number,
    ) => void;
    handleClearInput: (name: keyof Omit<Prompt, "sync">) => void;
    getFieldErrors: (
      fieldKey: keyof Omit<Prompt, "sync">,
    ) => string[] | undefined;
    handleSubmit: () => void;
  };
  onTagSelectionMode: () => void;
  onClosePopUp: () => void;
}

const UpdatePromptForm = ({
  isLoading,
  selectedTag,
  form,
  onTagSelectionMode,
  onClosePopUp,
}: UpdatePromptFormProps) => {
  const { data, getFieldErrors, handleChange, handleClearInput, handleSubmit } =
    form;

  const { t } = useTranslations();

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Input<UpdatePromptFormData>
              label={t(
                "prompts_translations.update_prompt_template.form_labels.title.label",
              )}
              icon="text-outline"
              name="promptTitle"
              value={data.promptTitle}
              placeholder={t(
                "prompts_translations.update_prompt_template.form_labels.title.placeholder",
              )}
              errorMessage={getFieldErrors("promptTitle")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("promptTitle")}
              isInPopUp
            />
          </Form.Row.Item>
        </Form.Row>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.PromptInput<UpdatePromptFormData>
              label={t(
                "prompts_translations.update_prompt_template.form_labels.prompt_text.label",
              )}
              icon="chatbox-ellipses-outline"
              name="promptText"
              value={data.promptText}
              placeholder={t(
                "prompts_translations.update_prompt_template.form_labels.prompt_text.placeholder",
              )}
              errorMessage={getFieldErrors("promptText")?.join(", ")}
              onChange={handleChange}
              onClearInput={() => handleClearInput("promptText")}
              isInPopUp
            />
          </Form.Row.Item>
        </Form.Row>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Dropdown<
              UpdatePromptFormData,
              {
                tagId: string;
                type: "prompt_tag" | "resource_tag";
                name: string;
              }
            >
              name="tag"
              label={t(
                "prompts_translations.update_prompt_template.form_labels.tag.label",
              )}
              icon="pricetag-outline"
              placeholder={t(
                "prompts_translations.update_prompt_template.form_labels.tag.placeholder",
              )}
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
            icon="pencil-outline"
            label={t(
              "prompts_translations.update_prompt_template.form_labels.btn_update_prompt",
            )}
            loading={isLoading}
            loadingMessage={t(
              "prompts_translations.update_prompt_template.form_loading_messages.updating_prompt_msg",
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
              "prompts_translations.update_prompt_template.form_labels.btn_cancel",
            )}
            onPress={onClosePopUp}
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default UpdatePromptForm;
