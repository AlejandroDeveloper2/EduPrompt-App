import { create } from "zustand";

import { GenerationsFiltersStoreType } from "./store-types";

export const useGenerationTagsStore = create<GenerationsFiltersStoreType>(
  (set) => ({
    searchTagValue: "",
    tagFilter: null,
    tagType: "promptType",

    onSearchTagValueChange: (value: string): void => {
      set({ searchTagValue: value });
    },
    onTagTypeChange: (tagType): void => {
      set({ tagType });
    },
    onTagFilterChange: (tag) => {
      set({ tagFilter: tag });
    },

    reset: (): void => {
      set({
        tagFilter: null,
        tagType: "promptType",
        searchTagValue: "",
      });
    },
  }),
);
