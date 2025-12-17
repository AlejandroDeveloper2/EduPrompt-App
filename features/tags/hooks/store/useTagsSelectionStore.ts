import { useStore } from "zustand";

import { TagsSelectionStore } from "../../store";

const useTagsSelectionStore = () => {
  return useStore(TagsSelectionStore);
};

export default useTagsSelectionStore;
