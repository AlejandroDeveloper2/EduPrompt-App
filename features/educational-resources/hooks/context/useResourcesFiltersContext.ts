import { useContext } from "react";

import { ResourcesFiltersContext } from "../../context";

const useResourcesFiltersContext = () => {
  const context = useContext(ResourcesFiltersContext);
  if (!context)
    throw new Error(
      "Estas accidiendo al contexto de ResourceFilters por fuera del provider"
    );
  return context;
};

export default useResourcesFiltersContext;
