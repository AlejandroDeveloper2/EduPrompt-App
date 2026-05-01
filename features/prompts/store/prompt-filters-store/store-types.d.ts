import { Tag } from "@/features/tags/types";

interface StoreStateProps {
  searchPromptValue: string;
  searchTagValue: string;
  tagFilter: Tag | null;
}

interface StoreActions {
  onSearchPromptValueChange: (value: string) => void;
  onSearchTagValueChange: (value: string) => void;
  onTagFilterChange: (tag: Tag | null) => void;
}

export type PromptFiltersStoreType = StoreStateProps & StoreActions;
