/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";

import { Tag } from "@/features/tags/types";
import { Prompt } from "../../types";

import { useForm } from "@/shared/hooks/core";
import { usePromptFiltersContext } from "../context";
import useUpdatePrompt from "./useUpdatePrompt";

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
  onClosePopUp: () => void
) => {
  const { isPending, editPrompt } = useUpdatePrompt();
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
    actionCallback: async () => {
      await editPrompt(data);
      onClosePopUp();
    },
    noReset: true,
  });

  const { paginatedTags } = usePromptFiltersContext();

  const selectedTag = useMemo(
    () => getSelectedOption(paginatedTags.tags, data.tag, "tagId"),
    [data.tag]
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
