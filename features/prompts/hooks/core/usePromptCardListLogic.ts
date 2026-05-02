import { useDeleteManyPromptsMutation } from "../mutations";
import usePromptListUI from "./usePromptListUI";
import usePrompts from "./usePrompts";
import usePromptSelection from "./usePromptSelection";

const usePromptCardListLogic = () => {
  /** Get Prompts Logic */
  const promptsLogic = usePrompts();

  /** UI Logic */
  const { t, size, confirmPromptDeleteDialog, handleViewPrompt } =
    usePromptListUI();

  /** Selection Logic */
  const { selectedPromptIds } = usePromptSelection();

  /** Mutation */
  const { isPending, mutate: removeManyPrompts } =
    useDeleteManyPromptsMutation();

  return {
    ...promptsLogic,
    size,
    handleViewPrompt,
    confirmPromptDeleteDialog,
    isPending,
    removeManyPrompts,
    t,
    selectedPromptIds,
  };
};

export default usePromptCardListLogic;
