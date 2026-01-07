import { Tag } from "@/features/tags/types";
import { ResourceFormatKey } from "../../types";

export interface ProviderProps {
  children: ReactNode | ReactNode[];
}

interface ContextStateProps {
  searchResourceValue: string;
  formatFilter: ResourceFormatKey | null;
  tagFilter: Tag | null;
  searchTagValue: string;
  paginatedTags: {
    tags: Tag[];
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    refreshing: boolean;
  };
}
interface ContextActions {
  onSearchResourceValueChange: (value: string) => void;
  onSearchTagValueChange: (value: string) => void;
  onFormatFilterChange: (selectedFilter: ResourceFormatKey | null) => void;
  onTagFilterChange: (selectedTag: Tag | null) => void;
}

export type ResourcesFiltersContextType = ContextStateProps & ContextActions;
