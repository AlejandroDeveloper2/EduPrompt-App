/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";

import { RESOURCE_FORMATS } from "../../constants";

import {
  ResourceFormatFormData,
  resourceFormatFormSchema,
} from "../../components/organims/resource-format-form/validationSchema";

import { useAnimatedPopUp } from "@/shared/hooks/animations";
import { useForm } from "@/shared/hooks/core";
import { useGenerationsStore } from "../store";

import { getSelectedOption } from "../../helpers";

const initialValues: ResourceFormatFormData = {
  formatKey: "text",
};

const useFormatFormLogic = () => {
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
    validationSchema: resourceFormatFormSchema,
    actionCallback: () => {
      if (!currentIaGeneration) return;
      const resourceFormat = getSelectedOption(
        RESOURCE_FORMATS,
        data.formatKey,
        "formatKey"
      );

      if (!resourceFormat) return;

      updateIaGeneration(
        currentIaGeneration.generationId,
        { resourceFormat },
        { completed: true },
        {}
      );
      setGenerationStep(currentIaGeneration.generationId, "language_selection");
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

  const selectedFormat = useMemo(
    () => getSelectedOption(RESOURCE_FORMATS, data.formatKey, "formatKey"),
    [data.formatKey]
  );

  useEffect(() => {
    if (!currentIaGeneration) return;
    const { data: currentData } = currentIaGeneration;
    setValues({
      formatKey: currentData.resourceFormat.formatKey,
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
    selectedFormat,
  };
};

export default useFormatFormLogic;
