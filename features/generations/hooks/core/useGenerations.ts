import { useShallow } from "zustand/react/shallow";

import { useSearchInput } from "@/shared/hooks/core";
import { useResourceGenerationStore } from "../../store";

const useGenerations = () => {
  const { iaGenerations, createIaGeneration } = useResourceGenerationStore(
    useShallow((state) => ({
      iaGenerations: state.iaGenerations,
      createIaGeneration: state.createIaGeneration,
    })),
  );

  const {
    searchValue,
    filteredElements,
    handleSearchChange,
    onClearSearchInput,
  } = useSearchInput(iaGenerations, "title");

  return {
    createIaGeneration,
    searchValue,
    filteredElements,
    handleSearchChange,
    onClearSearchInput,
  };
};

export default useGenerations;
