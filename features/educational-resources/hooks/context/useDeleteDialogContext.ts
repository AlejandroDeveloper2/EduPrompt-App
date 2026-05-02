import { useContext } from "react";

import { DeleteDialogContext } from "../../context";

const useDeleteDialogContext = () => {
  const context = useContext(DeleteDialogContext);
  if (!context) {
    throw new Error(
      "useDeleteDialogContext must be used within a DeleteDialogProvider",
    );
  }
  return context;
};

export default useDeleteDialogContext;
