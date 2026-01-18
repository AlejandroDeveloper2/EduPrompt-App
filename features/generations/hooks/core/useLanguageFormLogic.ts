/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";

import { APP_LANGUAGES } from "@/shared/constants";

import { useAnimatedPopUp } from "@/shared/hooks/animations";
import { useForm, useTranslations } from "@/shared/hooks/core";
import { useGenerationsStore } from "../store";

import {
  LanguageFormData,
  languageFormSchema,
} from "../../components/organims/language-form/validationSchema";

import { getSelectedOption } from "../../helpers";

const initialValues: LanguageFormData = {
  language: "es",
};

const useLanguageFormLogic = () => {
  const { currentIaGeneration, setGenerationStep, updateIaGeneration } =
    useGenerationsStore();

  const { t } = useTranslations();

  const appLanguages = useMemo(() => APP_LANGUAGES(t), [t]);

  const {
    data,
    getFieldErrors,
    handleChange,
    handleClearInput,
    handleSubmit,
    setValues,
  } = useForm({
    initialValues,
    validationSchema: languageFormSchema,
    actionCallback: () => {
      if (!currentIaGeneration) return;
      const language = getSelectedOption(appLanguages, data.language, "key");

      if (!language) return;

      updateIaGeneration(
        currentIaGeneration.generationId,
        { language },
        { completed: true },
        {},
      );
      setGenerationStep(
        currentIaGeneration.generationId,
        "resource_description_prompt",
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

  const selectedLanguage = useMemo(
    () => getSelectedOption(appLanguages, data.language, "key"),
    [data.language],
  );

  useEffect(() => {
    if (!currentIaGeneration) return;
    const { data: currentData } = currentIaGeneration;
    setValues({
      language: currentData.language.key as "es" | "en" | "pt",
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
    appLanguages,
    selectedLanguage,
    t,
  };
};

export default useLanguageFormLogic;
