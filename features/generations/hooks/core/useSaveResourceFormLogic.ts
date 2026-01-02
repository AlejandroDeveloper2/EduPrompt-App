/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from "react";

import { Tag } from "@/features/tags/types";

import { eventBus } from "@/core/events/EventBus";

import {
  CreateResourceFormData,
  createResourceSchema,
} from "../../components/organims/save-resource-form/validationSchema";

import { useAnimatedPopUp } from "@/shared/hooks/animations";
import { useForm } from "@/shared/hooks/core";
import { useEventBusToggle, useEventbusValue } from "@/shared/hooks/events";
import { useGenerationsStore } from "../store";

import { getSelectedOption } from "../../helpers";

const initialValues: CreateResourceFormData = {
  title: "",
  groupTag: "",
};

const useSaveResourceFormLogic = () => {
  const [isTagSelectionMode, setIsTagSelectionMode] = useState<boolean>(false);

  const saveResourcePopUp = useAnimatedPopUp();

  const { currentIaGeneration } = useGenerationsStore();

  const { data, handleChange, handleClearInput, getFieldErrors, handleSubmit } =
    useForm({
      initialValues,
      validationSchema: createResourceSchema,
      actionCallback: async () => {
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
        saveResourcePopUp.onClosePopUp();
      },
    });

  const isLoading = useEventBusToggle("resources.createResource.started", [
    "resources.createResource.completed",
    "resources.createResource.failed",
  ]);

  const tagsPagination = useEventbusValue("tags.list.pagination.updated", {
    tags: [],
    hasNextPage: false,
    isFetchingNextPage: false,
    refreshing: false,
  });

  const selectedTag = useMemo(
    () => getSelectedOption(tagsPagination.tags, data.groupTag, "tagId"),
    [data.groupTag]
  ) as Tag | null;

  return {
    isLoading,
    selectedTag,
    tagsPagination,
    saveResourcePopUp,
    form: {
      formData: data,
      handleChange,
      handleClearInput,
      getFieldErrors,
      handleSubmit,
    },
    isTagSelectionMode,
    setIsTagSelectionMode,
  };
};

export default useSaveResourceFormLogic;
