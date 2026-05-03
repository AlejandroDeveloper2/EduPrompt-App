/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { Tag } from "@/features/tags/types";

import { eventBus } from "@/core/events/EventBus";

import { useForm } from "@/shared/hooks/core";
import { useEventBusToggle } from "@/shared/hooks/events";
import {
  useGenerationTagsStore,
  useResourceGenerationStore,
} from "../../store";
import useGenerationTags from "../core/useGenerationTags";

import { getSelectedOption } from "../../helpers";

import {
  SavePromptFormData,
  savePromptFormSchema,
} from "../../components/organims/generation-forms/save-prompt-form/validationSchema";

const initialValues: SavePromptFormData = {
  promptTitle: "",
  promptText: "",
  tag: "",
};

const useSavePromptFormLogic = (onClosePopUp?: () => void) => {
  const isLoading = useEventBusToggle("prompts.savePrompt.started", [
    "prompts.savePrompt.completed",
    "prompts.savePrompt.failed",
  ]);

  const {
    data,
    handleChange,
    handleClearInput,
    getFieldErrors,
    handleSubmit,
    setValues,
  } = useForm({
    initialValues,
    validationSchema: savePromptFormSchema,
    actionCallback: () => {
      eventBus.emit("prompts.savePrompt.requested", data);
      if (!isLoading) onClosePopUp?.();
    },
  });

  const { searchTagValue, onSearchTagValueChange, onTagTypeChange } =
    useGenerationTagsStore(
      useShallow((state) => ({
        searchTagValue: state.searchTagValue,
        onSearchTagValueChange: state.onSearchTagValueChange,
        onTagTypeChange: state.onTagTypeChange,
      })),
    );

  const currentIaGeneration = useResourceGenerationStore(
    useShallow((state) => state.currentIaGeneration),
  );

  const paginatedTags = useGenerationTags();

  const selectedTag = useMemo(
    () => getSelectedOption(paginatedTags.tags, data.tag, "tagId"),
    [data.tag],
  ) as Tag | null;

  useEffect(() => {
    if (!currentIaGeneration) return;
    setValues({
      promptText: currentIaGeneration.data.resourceDescriptionPrompt,
    });
  }, [currentIaGeneration]);

  return {
    isLoading,
    selectedTag,
    paginatedTags,
    searchTagValue,
    onSearchTagValueChange,
    onTagTypeChange,
    form: {
      data,
      handleChange,
      handleClearInput,
      getFieldErrors,
      handleSubmit,
      setValues,
    },
  };
};

export default useSavePromptFormLogic;
