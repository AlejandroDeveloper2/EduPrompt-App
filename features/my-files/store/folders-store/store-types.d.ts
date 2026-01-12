import { Order } from "@/core/types";
import { Folder } from "../../types";

export interface FolderStoreType {
  isSharing: boolean;
  folders: Folder[];
  loadFolders: (orderBy: Order) => void;
  selectFolder: (folderId: string) => void;
  editFolderName: (folderId: string, updatedName: string) => void;
  deleteManyFolders: () => void;
  shareManyFolders: () => Promise<void>;
}
