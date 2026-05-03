import useGenerationListUI from "./useGenerationListUI";
import useGenerations from "./useGenerations";

const useGenerationListLogic = () => {
  /** Get Generations Logic */
  const generationsLogic = useGenerations();

  /** UI Logic */
  const { size, t } = useGenerationListUI();

  return {
    size,
    t,
    ...generationsLogic,
  };
};

export default useGenerationListLogic;
