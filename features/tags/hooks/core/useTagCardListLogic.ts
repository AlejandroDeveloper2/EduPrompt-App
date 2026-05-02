import { useDeleteManyTagsMutation } from "../mutations";
import useTagListUI from "./useTagListUI";
import useTags from "./useTags";
import useTagSelection from "./useTagSelection";

const useTagCardListLogic = () => {
  /** Get tags logic */
  const tagsLogic = useTags();

  /** UI Logic */
  const { t, size, confirmTagDeleteDialog, handleViewTag } = useTagListUI();

  /** Selection Logic */
  const { selectedTagIds } = useTagSelection();

  /** Mutation */
  const { isPending, mutate: removeManyTags } = useDeleteManyTagsMutation();

  return {
    ...tagsLogic,
    t,
    size,
    confirmTagDeleteDialog,
    handleViewTag,
    selectedTagIds,
    isPending,
    removeManyTags,
  };
};

export default useTagCardListLogic;
