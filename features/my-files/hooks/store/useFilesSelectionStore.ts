import { useStore } from "zustand";

import { FilesSelectionStore } from "../../store";

const useFilesSelectionStore = () => {
  return useStore(FilesSelectionStore);
};

export default useFilesSelectionStore;
