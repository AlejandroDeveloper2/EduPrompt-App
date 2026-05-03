import { Tag } from "@/features/tags/types";

interface StoreStateProps {
  searchTagValue: string;
  tagFilter: Tag | null;
  tagType: "promptType" | "resourceType";
}

interface StoreActions {
  onSearchTagValueChange: (value: string) => void;
  onTagTypeChange: (tagType: "promptType" | "resourceType") => void;
  onTagFilterChange: (tag: Tag | null) => void;
  reset: () => void;
}

export type GenerationsFiltersStoreType = StoreStateProps & StoreActions;
