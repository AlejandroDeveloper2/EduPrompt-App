/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";

import { eventBus } from "@/core/events/EventBus";

import {
  SavePromptFormData,
  savePromptFormSchema,
} from "../../components/organims/resource-description-form/validationSchema";

import { useForm } from "@/shared/hooks/core";
import { useEventBusToggle, useEventbusValue } from "@/shared/hooks/events";

import { Tag } from "@/features/tags/types";
import { getSelectedOption } from "../../helpers";

const initialValues: SavePromptFormData = {
  promptTitle: "",
  promptText: "",
  tag: "",
};

const useSavePromptFormLogic = (promptText: string) => {
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
    },
  });

  const isLoading = useEventBusToggle("prompts.savePrompt.started", [
    "prompts.savePrompt.completed",
    "prompts.savePrompt.failed",
  ]);

  const tagsPagination = useEventbusValue("tags.list.pagination.updated", {
    tags: [],
    hasNextPage: false,
    isFetchingNextPage: false,
    refreshing: false,
  });

  const selectedTag = useMemo(
    () => getSelectedOption(tagsPagination.tags, data.tag, "tagId"),
    [data.tag]
  ) as Tag | null;

  useEffect(() => {
    setValues({ promptText });
  }, [promptText]);

  return {
    isLoading,
    selectedTag,
    tagsPagination,
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
