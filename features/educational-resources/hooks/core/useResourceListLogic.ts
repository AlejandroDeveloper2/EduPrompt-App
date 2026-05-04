import useDeleteManyResourcesMutation from "../mutations/useDeleteManyResourcesMutation";
import useResourceListUI from "./useResourceListUI";
import useResources from "./useResources";
import useResourceSelection from "./useResourceSelection";

const useResourceListLogic = () => {
  /** Get Resources Logic */
  const resourceLogic = useResources();

  /** UI Logic */
  const { size, t, confirmResourceDeleteDialog, handleViewResource } =
    useResourceListUI();

  /** Selection Logic */
  const { selectedResourceIds, selectionMode } = useResourceSelection();

  /** Mutation */
  const { isPending, mutate: removeManyResources } =
    useDeleteManyResourcesMutation();

  return {
    ...resourceLogic,
    size,
    handleViewResource,
    confirmResourceDeleteDialog,
    isPending,
    removeManyResources,
    t,
    selectedResourceIds,
    selectionMode,
  };
};

export default useResourceListLogic;
