import { Tag } from "@/features/tags/types";

export interface ProviderProps {
  children: ReactNode | ReactNode[];
}

interface ContextStateProps {
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
  onSearchTagValueChange: (value: string) => void;
  onTagFilterChange: (selectedTag: Tag | null) => void;
  setTagType: (type: "promptType" | "resourceType") => void;
}

export type TagFiltersContextType = ContextStateProps & ContextActions;
