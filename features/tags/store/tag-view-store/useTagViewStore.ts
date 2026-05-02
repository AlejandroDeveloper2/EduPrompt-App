import { create } from "zustand";

import { TagViewStoreType } from "./store-types";

export const useTagViewStore = create<TagViewStoreType>((set) => ({
  selectedTag: null,
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  reset: () => set({ selectedTag: null }),
}));
