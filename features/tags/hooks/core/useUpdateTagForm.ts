import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import {
  UpdateTagFormData,
  updateTagSchema,
} from "../../components/organims/update-tag-form/validationSchema";

import { useForm, useTranslations } from "@/shared/hooks/core";
import { useTagViewStore } from "../../store";
import { useUpdateTagMutation } from "../mutations";

const initialValues: UpdateTagFormData = {
  tagId: "",
  name: "",
  type: "prompt_tag",
};

const useUpdateTagForm = () => {
  const router = useRouter();

  const { isPending, mutate } = useUpdateTagMutation();
  const { selectedTag, reset } = useTagViewStore(
    useShallow((state) => ({
      selectedTag: state.selectedTag,
      reset: state.reset,
    })),
  );

  const {
    data,
    handleSubmit,
    handleChange,
    handleClearInput,
    getFieldErrors,
    setValues,
  } = useForm({
    initialValues,
    validationSchema: updateTagSchema,
    actionCallback: () => {
      mutate(data, {
        onSuccess: () => {
          reset();
          router.back();
        },
      });
    },
    noReset: true,
  });

  const { t } = useTranslations();

  useEffect(() => {
    if (selectedTag) setValues({ ...selectedTag });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTag]);

  return {
    data,
    isPending,
    t,
    handleSubmit,
    handleChange,
    handleClearInput,
    getFieldErrors,
  };
};

export default useUpdateTagForm;
