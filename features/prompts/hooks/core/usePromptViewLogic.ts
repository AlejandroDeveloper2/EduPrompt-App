import { useRouter } from "expo-router";

import { useTranslations } from "@/shared/hooks/core";
import { usePromptViewStore } from "../../store";
import useUpdatePromptFormLogic from "./useUpdatePromptFormLogic";

const usePromptView = () => {
  const router = useRouter();
  const { t } = useTranslations();

  const {
    isTagSelection,
    selectedPrompt,
    setSelectedPrompt,
    setIsTagSelection,
    reset,
  } = usePromptViewStore();

  const handleClose = () => {
    reset();
    router.back();
  };

  const { isPending, selectedTag, form } = useUpdatePromptFormLogic(
    selectedPrompt,
    handleClose,
  );

  return {
    t,
    isTagSelection,
    setSelectedPrompt,
    setIsTagSelection,
    reset,
    handleClose,
    isPending,
    selectedTag,
    form,
  };
};
export default usePromptView;
