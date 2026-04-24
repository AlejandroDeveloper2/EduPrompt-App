import { Tag } from "@/features/tags/types";
import { ResourceFormatKey } from "../../types";

interface StoreStateProps {
  searchResourceValue: string;
  searchTagValue: string;
  formatFilter: ResourceFormatKey | null;
  tagFilter: Tag | null;
}

interface StoreActions {
  onSearchResourceValueChange: (value: string) => void;
  onSearchTagValueChange: (value: string) => void;
  onFormatFilterChange: (format: ResourceFormatKey | null) => void;
  onTagFilterChange: (tag: Tag | null) => void;
}

export type ResourceFiltersStoreType = StoreStateProps & StoreActions;
