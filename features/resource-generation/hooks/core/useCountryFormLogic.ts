/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";

import { COUNTRIES } from "../../constants";

import { useAnimatedPopUp } from "@/shared/hooks/animations";
import { useForm } from "@/shared/hooks/core";
import { useGenerationsStore } from "../store";

import {
  CountryFormData,
  countryFormSchema,
} from "../../components/organims/country-form/validationSchema";

import { getSelectedOption } from "../../helpers";

const initialValues: CountryFormData = {
  country: "",
};

const useCountryFormLogic = () => {
  const { currentIaGeneration, setGenerationStep, updateIaGeneration } =
    useGenerationsStore();
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

      const country = getSelectedOption(COUNTRIES, data.country, "countryId");

      if (!country) return;

      updateIaGeneration(
        currentIaGeneration.generationId,
        { country },
        { completed: true },
        {}
      );

      setGenerationStep(
        currentIaGeneration.generationId,
        "resource_format_selection"
      );
    },
    noReset: true,
  });

  const {
    onOpenPopUp,
    isPopUpMounted,
    dragGesture,
    animatedPopUpStyle,
    onClosePopUp,
  } = useAnimatedPopUp();

  const selectedCountry = useMemo(
    () => getSelectedOption(COUNTRIES, data.country, "countryId"),
    [data.country]
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
    popUp: {
      onOpenPopUp,
      isPopUpMounted,
      dragGesture,
      animatedPopUpStyle,
      onClosePopUp,
    },
    selectedCountry,
  };
};

export default useCountryFormLogic;
