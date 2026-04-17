/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";

import { Tag } from "@/features/tags/types";
import { Prompt } from "../../types";

import { useForm } from "@/shared/hooks/core";
import { usePromptFiltersContext } from "../context";
import { useUpdatePromptMutation } from "../mutations";

import {
  UpdatePromptFormData,
  updatePromptSchema,
} from "../../components/organims/update-prompt-form/validationSchema";

import { getSelectedOption } from "@/features/generations/helpers";

const initialValues: UpdatePromptFormData = {
  promptTitle: "",
  promptText: "",
  tag: "",
  promptId: "",
};

const useUpdatePromptFormLogic = (
  selectedPrompt: Prompt | null,
  onClosePopUp: () => void,
) => {
  const { isPending, mutate } = useUpdatePromptMutation();
  const {
    data,
    handleChange,
    handleClearInput,
    getFieldErrors,
    handleSubmit,
    setValues,
  } = useForm({
    initialValues,
    validationSchema: updatePromptSchema,
    actionCallback: () => {
      mutate(data, { onSuccess: () => onClosePopUp() });
    },
    noReset: true,
  });

  const { paginatedTags } = usePromptFiltersContext();

  const selectedTag = useMemo(
    () => getSelectedOption(paginatedTags.tags, data.tag, "tagId"),
    [data.tag],
  ) as Tag | null;

  useEffect(() => {
    if (selectedPrompt) setValues({ ...selectedPrompt });
  }, [selectedPrompt]);

  return {
    isPending,
    selectedTag,
    form: {
      data,
      handleChange,
      handleClearInput,
      getFieldErrors,
      handleSubmit,
    },
  };
};

export default useUpdatePromptFormLogic;
