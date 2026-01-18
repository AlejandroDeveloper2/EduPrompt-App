import { useContext } from "react";

import { TagFiltersContext } from "../../context";

const useTagFiltersContext = () => {
  const context = useContext(TagFiltersContext);
  if (!context)
    throw new Error(
      "Estas accidiendo al contexto de TagFilters por fuera del provider"
    );
  return context;
};

export default useTagFiltersContext;
