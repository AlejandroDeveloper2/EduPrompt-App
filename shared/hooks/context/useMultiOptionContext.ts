import { useContext } from "react";

import { MultiOptionInputContext } from "@/shared/context";

const useMultiOptionContext = () => {
  const context = useContext(MultiOptionInputContext);
  if (!context)
    throw new Error(
      "Estas accidiendo al contexto de Multioption por fuera del provider"
    );
  return context;
};

export default useMultiOptionContext;
