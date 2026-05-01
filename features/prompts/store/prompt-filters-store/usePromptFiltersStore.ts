import { create } from "zustand";

import { PromptFiltersStoreType } from "./store-types";

export const usePromptFiltersStore = create<PromptFiltersStoreType>((set) => ({
  searchPromptValue: "",
  searchTagValue: "",
  tagFilter: null,
  onSearchPromptValueChange: (value: string) =>
    set({ searchPromptValue: value }),
  onSearchTagValueChange: (value: string) => set({ searchTagValue: value }),
  onTagFilterChange: (tag) => set({ tagFilter: tag }),
}));
