import { useDeleteManyResourcesMutation } from "../mutations";
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
  const { selectedResourceIds } = useResourceSelection();

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
  };
};

export default useResourceListLogic;
