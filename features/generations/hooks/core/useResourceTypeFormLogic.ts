/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";

import { LangTag } from "@/core/types";

import { EDUCATIONAL_RESOURCE_TYPES } from "../../constants";

import {
  ResourceTypeFormData,
  resourceTypeFormSchema,
} from "../../components/organims/resource-type-form/validationSchema";

import { useAnimatedPopUp } from "@/shared/hooks/animations";
import { useForm, useTranslations } from "@/shared/hooks/core";
import { useGenerationsStore } from "../store";

import { getSelectedOption, validateIsLastOptionSelected } from "../../helpers";

const initialValues: ResourceTypeFormData = {
  resourceTypeId: "",
};

const handleSelectedOption = (resourceTypeId: string, lang: LangTag) => {
  return getSelectedOption(
    EDUCATIONAL_RESOURCE_TYPES[lang],
    resourceTypeId,
    "resourceTypeId"
  );
};

const handleIsLastSelectedOption = (resourceTypeId: string, lang: LangTag) => {
  return validateIsLastOptionSelected(
    EDUCATIONAL_RESOURCE_TYPES[lang],
    resourceTypeId,
    "resourceTypeId"
  );
};

const useResourceTypeFormLogic = () => {
  const { currentIaGeneration, setGenerationStep, updateIaGeneration } =
    useGenerationsStore();

  const { t, lang } = useTranslations();

  const {
    data,
    getFieldErrors,
    handleChange,
    handleClearInput,
    handleClearOptionalInput,
    handleSubmit,
    setValues,
  } = useForm({
    initialValues,
    validationSchema: resourceTypeFormSchema,
    actionCallback: () => {
      if (!currentIaGeneration) return;
      const resourceType = handleSelectedOption(data.resourceTypeId, lang);

      if (!resourceType) return;

      const isLastOptionSelected = handleIsLastSelectedOption(
        data.resourceTypeId,
        lang
      );

      const { generationId } = currentIaGeneration;

      updateIaGeneration(
        generationId,
        {
          resourceType: isLastOptionSelected
            ? { ...resourceType, other: data.otherResourceType }
            : resourceType,
        },
        { completed: true },
        {
          title: data.otherResourceType ?? resourceType.resourceTypeLabel,
        }
      );
      setGenerationStep(generationId, "subject_name");
    },
    noReset: true,
  });

  const chooseResourceTypePopUp = useAnimatedPopUp();

  const { isLastOptionSelected } = useMemo(
    () => ({
      isLastOptionSelected: handleIsLastSelectedOption(
        data.resourceTypeId,
        lang
      ),
    }),
    [data.resourceTypeId, lang]
  );

  const { selectedOption } = useMemo(
    () => ({
      selectedOption: handleSelectedOption(data.resourceTypeId, lang),
    }),
    [data.resourceTypeId, lang]
  );

  useEffect(() => {
    if (!currentIaGeneration) return;
    const { data: currentData } = currentIaGeneration;
    setValues({
      resourceTypeId: currentData.resourceType.resourceTypeId,
      otherResourceType: currentData.resourceType.other,
    });
  }, [currentIaGeneration]);

  return {
    form: {
      data,
      getFieldErrors,
      handleChange,
      handleClearInput,
      handleClearOptionalInput,
      handleSubmit,
    },
    chooseResourceTypePopUp,
    isLastOptionSelected,
    selectedOption,
    lang,
    t,
  };
};

export default useResourceTypeFormLogic;
