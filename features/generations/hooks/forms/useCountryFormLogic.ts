/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { COUNTRIES } from "../../constants";

import { useForm, useTranslations } from "@/shared/hooks/core";
import { useResourceGenerationStore } from "../../store";

import {
  CountryFormData,
  countryFormSchema,
} from "../../components/organims/generation-forms/country-form/validationSchema";

import { getSelectedOption } from "../../helpers";

const initialValues: CountryFormData = {
  country: "",
};

const useCountryFormLogic = () => {
  const { currentIaGeneration, setGenerationStep, updateIaGeneration } =
    useResourceGenerationStore(
      useShallow((state) => ({
        currentIaGeneration: state.currentIaGeneration,
        setGenerationStep: state.setGenerationStep,
        updateIaGeneration: state.updateIaGeneration,
      })),
    );

  const { t, lang } = useTranslations();

  const {
    data,
    getFieldErrors,
    handleChange,
    handleClearInput,
    handleSubmit,
    setValues,
  } = useForm({
    initialValues,
    validationSchema: countryFormSchema,
    actionCallback: () => {
      if (!currentIaGeneration) return;

      const country = getSelectedOption(
        COUNTRIES[lang],
        data.country,
        "countryId",
      );

      if (!country) return;

      updateIaGeneration(
        currentIaGeneration.generationId,
        { country },
        { completed: true },
        {},
      );

      setGenerationStep(
        currentIaGeneration.generationId,
        "resource_format_selection",
      );
    },
    noReset: true,
  });

  const selectedCountry = useMemo(
    () => getSelectedOption(COUNTRIES[lang], data.country, "countryId"),
    [data.country, lang],
  );

  useEffect(() => {
    if (!currentIaGeneration) return;
    const { data: currentData } = currentIaGeneration;
    setValues({
      country: currentData.country.countryId,
    });
  }, [currentIaGeneration]);

  return {
    currentIaGeneration,
    setGenerationStep,
    form: {
      getFieldErrors,
      handleChange,
      handleClearInput,
      handleSubmit,
    },
    selectedCountry,
    t,
    lang,
  };
};

export default useCountryFormLogic;
