import { useRouter } from "expo-router";

import { ResourceFormat } from "@/features/generations/types";

import { useFormatFormLogic } from "@/features/generations/hooks/forms";

import { ResourceFormatFormData } from "./validationSchema";

import { Form } from "@/shared/components/organims";

const ResourceFormatForm = () => {
  const router = useRouter();
  const {
    currentIaGeneration,
    setGenerationStep,
    form: { getFieldErrors, handleClearInput, handleSubmit },
    selectedFormat,
    t,
  } = useFormatFormLogic();

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Dropdown<ResourceFormatFormData, ResourceFormat>
              name="formatKey"
              icon="image-outline"
              label={t(
                "generations_translations.resource_format_template.form_labels.format.label",
              )}
              placeholder={t(
                "generations_translations.resource_format_template.form_labels.format.placeholder",
              )}
              selectedOption={selectedFormat}
              optionValueKey="formatLabel"
              displayDropdownOptions={() =>
                router.push("/generation_resource_format_sheet")
              }
              errorMessage={getFieldErrors("formatKey")?.join(", ")}
              clearSelectedOption={() => handleClearInput("formatKey")}
            />
          </Form.Row.Item>
        </Form.Row>
      </Form.Fields>
      <Form.Actions configRows={{ sm: 2, md: 2, lg: 2 }}>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="neutral"
            width="100%"
            icon="chevron-back-outline"
            label={t(
              "generations_translations.resource_format_template.form_labels.btn_prev_step",
            )}
            onPress={() => {
              if (!currentIaGeneration) return;
              setGenerationStep(
                currentIaGeneration.generationId,
                "country_selection",
              );
            }}
          />
        </Form.Row.Item>
        <Form.Row.Item span={1}>
          <Form.Button
            variant="primary"
            width="100%"
            icon="chevron-forward-outline"
            label={t(
              "generations_translations.resource_format_template.form_labels.btn_next_step",
            )}
            onPress={handleSubmit}
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default ResourceFormatForm;
