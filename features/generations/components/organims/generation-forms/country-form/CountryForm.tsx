import { useRouter } from "expo-router";

import { Country } from "@/features/generations/types";

import { useCountryFormLogic } from "@/features/generations/hooks/forms";

import { CountryFormData } from "./validationSchema";

import { Form } from "@/shared/components/organims";

const CountryForm = () => {
  const router = useRouter();
  const {
    currentIaGeneration,
    setGenerationStep,
    form: { getFieldErrors, handleClearInput, handleSubmit },
    selectedCountry,
    t,
  } = useCountryFormLogic();

  return (
    <Form>
      <Form.Fields>
        <Form.Row configRows={{ sm: 1, md: 1, lg: 1 }}>
          <Form.Row.Item span={1}>
            <Form.Dropdown<CountryFormData, Country>
              name="country"
              icon="flag-outline"
              label={t(
                "generations_translations.country_template.form_labels.country.label",
              )}
              placeholder={t(
                "generations_translations.country_template.form_labels.country.placeholder",
              )}
              selectedOption={selectedCountry}
              optionValueKey="countryName"
              displayDropdownOptions={() =>
                router.push("/generation_country_sheet")
              }
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
              "generations_translations.country_template.form_labels.btn_prev_step",
            )}
            onPress={() => {
              if (!currentIaGeneration) return;
              setGenerationStep(
                currentIaGeneration.generationId,
                "educational_level_selection",
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
              "generations_translations.country_template.form_labels.btn_next_step",
            )}
            onPress={handleSubmit}
          />
        </Form.Row.Item>
      </Form.Actions>
    </Form>
  );
};

export default CountryForm;
