import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { Tag } from "@/features/tags/types";

import { eventBus } from "@/core/events/EventBus";

import {
  CreateResourceFormData,
  createResourceSchema,
} from "../../components/organims/generation-forms/save-resource-form/validationSchema";

import { useForm } from "@/shared/hooks/core";
import { useEventBusToggle } from "@/shared/hooks/events";
import {
  useGenerationTagsStore,
  useResourceGenerationStore,
} from "../../store";
import { useGenerationTags } from "../core";

import { getSelectedOption } from "../../helpers";

const initialValues: CreateResourceFormData = {
  title: "",
  groupTag: "",
};

const useSaveResourceFormLogic = (onClosePopUp?: () => void) => {
  const isLoading = useEventBusToggle("resources.createResource.started", [
    "resources.createResource.completed",
    "resources.createResource.failed",
  ]);

  const currentIaGeneration = useResourceGenerationStore(
    useShallow((state) => state.currentIaGeneration),
  );

  const { searchTagValue, onSearchTagValueChange, onTagTypeChange } =
    useGenerationTagsStore(
      useShallow((state) => ({
        searchTagValue: state.searchTagValue,
        onSearchTagValueChange: state.onSearchTagValueChange,
        onTagTypeChange: state.onTagTypeChange,
      })),
    );

  const { data, handleChange, handleClearInput, getFieldErrors, handleSubmit } =
    useForm({
      initialValues,
      validationSchema: createResourceSchema,
      actionCallback: () => {
        if (currentIaGeneration) {
          const { result, data: generationData } = currentIaGeneration;
          eventBus.emit("resources.createResource.requested", {
            title: data.title,
            content: result ? result.result : "Sin resultado",
            format: generationData.resourceFormat.formatLabel,
            formatKey: generationData.resourceFormat.formatKey,
            groupTag: data.groupTag,
          });
        }
        if (!isLoading) onClosePopUp?.();
      },
    });

  const paginatedTags = useGenerationTags();

  const selectedTag = useMemo(
    () => getSelectedOption(paginatedTags.tags, data.groupTag, "tagId"),
    [data.groupTag, paginatedTags],
  ) as Tag | null;

  return {
    isLoading,
    selectedTag,
    paginatedTags,
    searchTagValue,
    onSearchTagValueChange,
    onTagTypeChange,
    form: {
      formData: data,
      handleChange,
      handleClearInput,
      getFieldErrors,
      handleSubmit,
    },
  };
};

export default useSaveResourceFormLogic;
