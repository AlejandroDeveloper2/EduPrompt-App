import { create } from "zustand";

import { Tag } from "@/features/tags/types";
import { ResourceFormatKey } from "../../types";
import { ResourceFiltersStoreType } from "./store-types";

export const useResourceFiltersStore = create<ResourceFiltersStoreType>(
  (set) => ({
    searchResourceValue: "",
    searchTagValue: "",
    formatFilter: null,
    tagFilter: null,
    onSearchResourceValueChange: (value: string): void => {
      set({ searchResourceValue: value });
    },
    onSearchTagValueChange: (value: string): void => {
      set({ searchTagValue: value });
    },
    onFormatFilterChange: (format: ResourceFormatKey | null): void => {
      set({ formatFilter: format });
    },
    onTagFilterChange: (tag: Tag | null): void => {
      set({ tagFilter: tag });
    },
  }),
);
