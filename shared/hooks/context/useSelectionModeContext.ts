import { useContext } from "react";

import { SelectionModeContext } from "@/shared/context";

const useSelectionModeContext = () => {
  const context = useContext(SelectionModeContext);

  if (!context)
    throw new Error(
      "Estas accidiendo al contexto de Mode selección por fuera del provider"
    );
  return context;
};

export default useSelectionModeContext;
