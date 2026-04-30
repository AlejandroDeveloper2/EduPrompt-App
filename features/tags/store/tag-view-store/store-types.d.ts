import { Tag } from "../../types";

export interface StoreStateProps {
  selectedTag: Tag | null;
}

export interface StoreActions {
  setSelectedResource: (tag: Tag | null) => void;
  reset: () => void;
}

export type TagViewStoreType = StoreStateProps & StoreActions;
