import { create } from "zustand";

import { TagFiltersStoreType } from "./store-types";

export const useTagFiltersStore = create<TagFiltersStoreType>((set) => ({
  searchTagValue: "",
  tagTypeFilter: "resource_tag",
  onSearchTagValueChange: (value: string): void => {
    set({ searchTagValue: value });
  },
  onTagTypeFilterChange: (tagType) => {
    set({ tagTypeFilter: tagType });
  },
}));
