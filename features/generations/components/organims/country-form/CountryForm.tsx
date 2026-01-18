import { COUNTRIES } from "@/features/generations/constants";

import { Country } from "@/features/generations/types";

import { useCountryFormLogic } from "@/features/generations/hooks/core";

import { CountryFormData } from "./validationSchema";

import { DropdownOptionList, Form, PopUp } from "@/shared/components/organims";

const CountryForm = () => {
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
    selectedCountry,
    t,
    lang,
  } = useCountryFormLogic();

  return (
    <>
      <PopUp
        icon="flag-outline"
        title={t(
          "generations-translations.country-template.countries-popup-labels.title"
        )}
        isPopUpMounted={isPopUpMounted}
        gesture={dragGesture}
        animatedPopUpStyle={animatedPopUpStyle}
        onClosePopUp={onClosePopUp}
      >
        <DropdownOptionList<Country>
          optionList={COUNTRIES[lang]}
          optionIdkey="countryId"
          optionLabelKey="countryName"
          searchInputPlaceholder={t(
            "generations-translations.country-template.countries-popup-labels.search-input-placeholder"
          )}
          selectedOption={selectedCountry}
          onSelectOption={(option) => {
            handleChange("country", option.countryId);
            onClosePopUp();
          }}
        />
      </PopUp>
      <Form>
        <Form.Fields>
          <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
            <Form.Row.Item span={1}>
              <Form.Dropdown<CountryFormData, Country>
                name="country"
                icon="flag-outline"
                label={t(
                  "generations-translations.country-template.form-labels.country.label"
                )}
                placeholder={t(
                  "generations-translations.country-template.form-labels.country.placeholder"
                )}
                selectedOption={selectedCountry}
                optionValueKey="countryName"
                displayDropdownOptions={onOpenPopUp}
                errorMessage={getFieldErrors("country")?.join(", ")}
                clearSelectedOption={() => handleClearInput("country")}
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
                "generations-translations.country-template.form-labels.btn-prev-step"
              )}
              onPress={() => {
                if (!currentIaGeneration) return;
                setGenerationStep(
                  currentIaGeneration.generationId,
                  "educational_level_selection"
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
                "generations-translations.country-template.form-labels.btn-next-step"
              )}
              onPress={handleSubmit}
            />
          </Form.Row.Item>
        </Form.Actions>
      </Form>
    </>
  );
};

export default CountryForm;
