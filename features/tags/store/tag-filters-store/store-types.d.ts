import { TagType } from "../../types";

interface StoreStateProps {
  searchTagValue: string;
  tagTypeFilter: TagType;
}

interface StoreActions {
  onSearchTagValueChange: (value: string) => void;
  onTagTypeFilterChange: (tagType: TagType) => void;
}

export type TagFiltersStoreType = StoreStateProps & StoreActions;
