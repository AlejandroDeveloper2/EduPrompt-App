import { useState } from "react";

const useToolbar = () => {
  const [selectionMode, setSelectionMode] = useState<boolean>(false);
  const [showToolbar, setShowToolbar] = useState<boolean>(false);

  const toggleSelectionMode = (): void => {
    if (!selectionMode) {
      setShowToolbar(true);
    }
    setSelectionMode((prev) => !prev);
  };

  const onHiddenToolbar = (): void => {
    setShowToolbar(false);
  };

  return {
    selectionMode,
    showToolbar,
    toggleSelectionMode,
    onHiddenToolbar,
  };
};

export default useToolbar;
