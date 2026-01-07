import { useContext } from "react";

import { PromptFiltersContext } from "../../context";

const usePromptFiltersContext = () => {
  const context = useContext(PromptFiltersContext);
  if (!context)
    throw new Error(
      "Estas accidiendo al contexto de PromptFilters por fuera del provider"
    );
  return context;
};

export default usePromptFiltersContext;
