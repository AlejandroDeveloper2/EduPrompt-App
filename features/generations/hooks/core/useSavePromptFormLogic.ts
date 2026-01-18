/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";

import { Tag } from "@/features/tags/types";

import { eventBus } from "@/core/events/EventBus";

import {
  SavePromptFormData,
  savePromptFormSchema,
} from "../../components/organims/resource-description-form/validationSchema";

import { useForm } from "@/shared/hooks/core";
import { useEventBusToggle } from "@/shared/hooks/events";
import { useTagFiltersContext } from "../context";

import { getSelectedOption } from "../../helpers";

const initialValues: SavePromptFormData = {
  promptTitle: "",
  promptText: "",
  tag: "",
};

const useSavePromptFormLogic = (
  promptText: string,
  onClosePopUp: () => void
) => {
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
      onClosePopUp();
    },
  });

  const isLoading = useEventBusToggle("prompts.savePrompt.started", [
    "prompts.savePrompt.completed",
    "prompts.savePrompt.failed",
  ]);

  const { paginatedTags, searchTagValue, onSearchTagValueChange } =
    useTagFiltersContext();

  const selectedTag = useMemo(
    () => getSelectedOption(paginatedTags.tags, data.tag, "tagId"),
    [data.tag]
  ) as Tag | null;

  useEffect(() => {
    setValues({ promptText });
  }, [promptText]);

  return {
    isLoading,
    selectedTag,
    paginatedTags,
    searchTagValue,
    onSearchTagValueChange,
    form: {
      data,
      handleChange,
      handleClearInput,
      getFieldErrors,
      handleSubmit,
    },
  };
};

export default useSavePromptFormLogic;
