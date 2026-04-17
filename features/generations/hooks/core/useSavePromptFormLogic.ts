/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";

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

const useSavePromptFormLogic = (onClosePopUp: () => void) => {
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
      if (!isLoading) onClosePopUp();
    },
  });

  const { paginatedTags, searchTagValue, onSearchTagValueChange, setTagType } =
    useTagFiltersContext();

  const selectedTag = useMemo(
    () => getSelectedOption(paginatedTags.tags, data.tag, "tagId"),
    [data.tag],
  ) as Tag | null;

  return {
    isLoading,
    selectedTag,
    paginatedTags,
    searchTagValue,
    onSearchTagValueChange,
    setTagType,
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
