import { useStore } from "zustand";

import { PromptsSelectionStore } from "../../store";

const usePromptsSelectionStore = () => {
  return useStore(PromptsSelectionStore);
};

export default usePromptsSelectionStore;
