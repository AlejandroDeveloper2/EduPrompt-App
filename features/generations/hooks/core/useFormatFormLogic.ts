/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { RESOURCE_FORMATS } from "../../constants";

import {
  ResourceFormatFormData,
  resourceFormatFormSchema,
} from "../../components/organims/resource-format-form/validationSchema";

import { useForm, usePopUp, useTranslations } from "@/shared/hooks/core";
import { useResourceGenerationStore } from "../../store";

import { getSelectedOption } from "../../helpers";

const initialValues: ResourceFormatFormData = {
  formatKey: "text",
};

const useFormatFormLogic = () => {
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
    validationSchema: resourceFormatFormSchema,
    actionCallback: () => {
      if (!currentIaGeneration) return;
      const resourceFormat = getSelectedOption(
        RESOURCE_FORMATS[lang],
        data.formatKey,
        "formatKey",
      );

      if (!resourceFormat) return;

      updateIaGeneration(
        currentIaGeneration.generationId,
        { resourceFormat },
        { completed: true },
        {},
      );
      setGenerationStep(currentIaGeneration.generationId, "language_selection");
    },
    noReset: true,
  });

  const popUp = usePopUp();

  const selectedFormat = useMemo(
    () =>
      getSelectedOption(RESOURCE_FORMATS[lang], data.formatKey, "formatKey"),
    [data.formatKey, lang],
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
    popUp,
    selectedFormat,
    lang,
    t,
  };
};

export default useFormatFormLogic;
