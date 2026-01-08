import { useStore } from "zustand";

import { FilesStore } from "../../store";

const useFilesStore = () => {
  return useStore(FilesStore);
};

export default useFilesStore;
