import useGenerationListUI from "./useGenerationListUI";
import useGenerations from "./useGenerations";
import useGenerationSelection from "./useGenerationSelection";

const useGenerationListLogic = () => {
  /** Get Generations Logic */
  const generationsLogic = useGenerations();

  /** Selection Mode */
  const { selectionMode } = useGenerationSelection();

  /** UI Logic */
  const { size, t } = useGenerationListUI();

  return {
    size,
    t,
    selectionMode,
    ...generationsLogic,
  };
};

export default useGenerationListLogic;
