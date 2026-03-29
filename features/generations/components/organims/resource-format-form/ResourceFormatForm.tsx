import { RESOURCE_FORMATS } from "@/features/generations/constants";

import { ResourceFormat } from "@/features/generations/types";

import { useFormatFormLogic } from "@/features/generations/hooks/core";

import { ResourceFormatFormData } from "./validationSchema";

import { DropdownOptionList, Form, PopUp } from "@/shared/components/organims";

const ResourceFormatForm = () => {
  const {
    currentIaGeneration,
    setGenerationStep,
    form: { getFieldErrors, handleChange, handleClearInput, handleSubmit },
    popUp: { openPopUp, isOpen, closePopUp },
    selectedFormat,
    lang,
    t,
  } = useFormatFormLogic();

  return (
    <>
      <PopUp
        icon="image-outline"
        title={t(
          "generations_translations.resource_format_template.resource_format_popup_labels.title",
        )}
        isOpen={isOpen}
        onClose={closePopUp}
      >
        <DropdownOptionList<ResourceFormat>
          optionList={RESOURCE_FORMATS[lang]}
          optionIdkey="formatKey"
          optionLabelKey="formatLabel"
          searchInputPlaceholder={t(
            "generations_translations.resource_format_template.resource_format_popup_labels.search_input_placeholder",
          )}
          selectedOption={selectedFormat}
          onSelectOption={(option) => {
            handleChange("formatKey", option.formatKey);
            closePopUp();
          }}
        />
      </PopUp>
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
                displayDropdownOptions={openPopUp}
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
    </>
  );
};

export default ResourceFormatForm;
