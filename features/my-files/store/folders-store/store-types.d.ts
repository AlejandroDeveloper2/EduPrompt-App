import { Folder } from "../../types";
import { OrderBy } from "../shared-types";

export interface FolderStoreType {
  folders: Folder[];
  loadFolders: (orderBy: OrderBy) => void;
  selectFolder: (folderId: string) => void;
  editFolderName: (folderId: string, updatedName: string) => void;
  deleteManyFolders: () => void;
  shareManyFolders: () => Promise<void>;
}
