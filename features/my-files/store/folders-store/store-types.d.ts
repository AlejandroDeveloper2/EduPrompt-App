import { Order } from "@/core/types";

export interface FolderStoreType {
  isSharing: boolean;
  loadFolders: (orderBy: Order) => void;
  selectFolder: (folderId: string) => void;
  editFolderName: (folderId: string, updatedName: string) => void;
  deleteManyFolders: () => void;
  shareManyFolders: () => Promise<void>;
}
