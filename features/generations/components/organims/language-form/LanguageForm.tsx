import { AppLanguage } from "@/core/types";

import { APP_LANGUAGES } from "@/shared/constants";

import { useLanguageFormLogic } from "@/features/generations/hooks/core";

import { LanguageFormData } from "./validationSchema";

import { DropdownOptionList, Form, PopUp } from "@/shared/components/organims";

const LanguageForm = () => {
  const {
    currentIaGeneration,
    setGenerationStep,
    form: { getFieldErrors, handleChange, handleClearInput, handleSubmit },
    popUp: {
      onOpenPopUp,
      isPopUpMounted,
      dragGesture,
      animatedPopUpStyle,
      onClosePopUp,
    },
    selectedLanguage,
  } = useLanguageFormLogic();

  return (
    <>
      <PopUp
        icon="language-outline"
        title="Selecciona el idioma"
        isPopUpMounted={isPopUpMounted}
        gesture={dragGesture}
        animatedPopUpStyle={animatedPopUpStyle}
        onClosePopUp={onClosePopUp}
      >
        <DropdownOptionList<AppLanguage>
          optionList={APP_LANGUAGES}
          optionIdkey="key"
          optionLabelKey="label"
          searchInputPlaceholder="Buscar idioma"
          selectedOption={selectedLanguage}
          onSelectOption={(option) => {
            handleChange("language", option.key);
            onClosePopUp();
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
                label="Idioma (*)"
                placeholder="Seleccione una opción"
                selectedOption={selectedLanguage}
                optionValueKey="label"
                displayDropdownOptions={onOpenPopUp}
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
              label="Anterior"
              onPress={() => {
                if (!currentIaGeneration) return;
                setGenerationStep(
                  currentIaGeneration.generationId,
                  "resource_format_selection"
                );
              }}
            />
          </Form.Row.Item>
          <Form.Row.Item span={1}>
            <Form.Button
              variant="primary"
              width="100%"
              icon="chevron-forward-outline"
              label="Siguiente"
              onPress={handleSubmit}
            />
          </Form.Row.Item>
        </Form.Actions>
      </Form>
    </>
  );
};

export default LanguageForm;
