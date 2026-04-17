/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";

import { Tag } from "@/features/tags/types";
import { EducationalResource } from "../../types";

import { useForm } from "@/shared/hooks/core";
import { useResourcesFiltersContext } from "../context";
import { useUpdateResourceMutation } from "../mutations";

import { getSelectedOption } from "@/features/generations/helpers";

import {
  UpdateResourceFormData,
  updateResourceSchema,
} from "../../components/organims/update-resource-form/validateSchema";

const initialValues: UpdateResourceFormData = {
  resourceId: "",
  title: "",
  groupTag: "",
};

const useUpdateResourceFormLogic = (
  selectedResource: EducationalResource | null,
  onClosePopUp: () => void,
) => {
  const { isPending, mutate } = useUpdateResourceMutation();
  const {
    data,
    handleChange,
    handleClearInput,
    getFieldErrors,
    handleSubmit,
    setValues,
  } = useForm({
    initialValues,
    validationSchema: updateResourceSchema,
    actionCallback: () => {
      mutate(data, { onSuccess: () => onClosePopUp() });
    },
    noReset: true,
  });

  const { paginatedTags } = useResourcesFiltersContext();

  const selectedTag = useMemo(
    () => getSelectedOption(paginatedTags.tags, data.groupTag, "tagId"),
    [data.groupTag],
  ) as Tag | null;

  useEffect(() => {
    if (selectedResource) setValues({ ...selectedResource });
  }, [selectedResource]);

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

export default useUpdateResourceFormLogic;
