/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";

import { EDUCATIONAL_RESOURCE_TYPES } from "../../constants";

import {
  ResourceTypeFormData,
  resourceTypeFormSchema,
} from "../../components/organims/resource-type-form/validationSchema";

import { useAnimatedPopUp } from "@/shared/hooks/animations";
import { useForm } from "@/shared/hooks/core";
import { useGenerationsStore } from "../store";

import { getSelectedOption, validateIsLastOptionSelected } from "../../helpers";

const initialValues: ResourceTypeFormData = {
  resourceTypeId: "",
};

const handleSelectedOption = (resourceTypeId: string) => {
  return getSelectedOption(
    EDUCATIONAL_RESOURCE_TYPES,
    resourceTypeId,
    "resourceTypeId"
  );
};

const handleIsLastSelectedOption = (resourceTypeId: string) => {
  return validateIsLastOptionSelected(
    EDUCATIONAL_RESOURCE_TYPES,
    resourceTypeId,
    "resourceTypeId"
  );
};

const useResourceTypeFormLogic = () => {
  const { currentIaGeneration, setGenerationStep, updateIaGeneration } =
    useGenerationsStore();
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
      const resourceType = handleSelectedOption(data.resourceTypeId);

      if (!resourceType) return;

      const isLastOptionSelected = handleIsLastSelectedOption(
        data.resourceTypeId
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
      isLastOptionSelected: handleIsLastSelectedOption(data.resourceTypeId),
    }),
    [data.resourceTypeId]
  );

  const { selectedOption } = useMemo(
    () => ({
      selectedOption: handleSelectedOption(data.resourceTypeId),
    }),
    [data.resourceTypeId]
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
  };
};

export default useResourceTypeFormLogic;
