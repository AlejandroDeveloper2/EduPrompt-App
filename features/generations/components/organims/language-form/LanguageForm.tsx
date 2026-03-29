import { AppLanguage } from "@/core/types";

import { useLanguageFormLogic } from "@/features/generations/hooks/core";

import { LanguageFormData } from "./validationSchema";

import { DropdownOptionList, Form, PopUp } from "@/shared/components/organims";

const LanguageForm = () => {
  const {
    currentIaGeneration,
    setGenerationStep,
    form: { getFieldErrors, handleChange, handleClearInput, handleSubmit },
    popUp: { openPopUp, isOpen, closePopUp },
    appLanguages,
    selectedLanguage,
    t,
  } = useLanguageFormLogic();

  return (
    <>
      <PopUp
        icon="language-outline"
        title={t(
          "generations_translations.language_template.language_selection_popup_labels.title",
        )}
        isOpen={isOpen}
        onClose={closePopUp}
      >
        <DropdownOptionList<AppLanguage>
          optionList={appLanguages}
          optionIdkey="key"
          optionLabelKey="label"
          searchInputPlaceholder={t(
            "generations_translations.language_template.language_selection_popup_labels.search_input_placeholder",
          )}
          selectedOption={selectedLanguage}
          onSelectOption={(option) => {
            handleChange("language", option.key);
            closePopUp();
          }}
        />
      </PopUp>
      <Form>
        <Form.Fields>
          <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
            <Form.Row.Item span={1}>
              <Form.Dropdown<LanguageFormData, AppLanguage>
                name="language"
                icon="language-outline"
                label={t(
                  "generations_translations.language_template.form_labels.language.label",
                )}
                placeholder={t(
                  "generations_translations.language_template.form_labels.language.placeholder",
                )}
                selectedOption={selectedLanguage}
                optionValueKey="label"
                displayDropdownOptions={openPopUp}
                errorMessage={getFieldErrors("language")?.join(", ")}
                clearSelectedOption={() => handleClearInput("language")}
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
                "generations_translations.language_template.form_labels.btn_prev_step",
              )}
              onPress={() => {
                if (!currentIaGeneration) return;
                setGenerationStep(
                  currentIaGeneration.generationId,
                  "resource_format_selection",
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
                "generations_translations.language_template.form_labels.btn_next_step",
              )}
              onPress={handleSubmit}
            />
          </Form.Row.Item>
        </Form.Actions>
      </Form>
    </>
  );
};

export default LanguageForm;
