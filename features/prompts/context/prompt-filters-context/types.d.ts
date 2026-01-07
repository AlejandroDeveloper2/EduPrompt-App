import { Tag } from "@/features/tags/types";

export interface ProviderProps {
  children: ReactNode | ReactNode[];
}

interface ContextStateProps {
  searchPromptValue: string;
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
  onSearchPromptValueChange: (value: string) => void;
  onSearchTagValueChange: (value: string) => void;
  onTagFilterChange: (selectedTag: Tag | null) => void;
}

export type PromptFiltersContextType = ContextStateProps & ContextActions;
