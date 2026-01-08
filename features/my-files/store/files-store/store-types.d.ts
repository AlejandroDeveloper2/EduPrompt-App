import { Folder, ResourceFormatKey } from "../../types";

interface StoreStateProps {
  folders: Folder[];
  folder: Folder | null;
  isDeleting: boolean;
}

interface StoreFolderActions {
  /** Folder Actions */
  loadFolders: (orderBy: "asc" | "desc") => Promise<void>;
  selectFolder: (folderId: string) => Promise<void>;
  editFolderName: (folderId: string, updatedName: string) => Promise<void>;
  deleteManyFolders: () => Promise<void>;
  shareManyFolders: () => Promise<void>;
}

interface StoreFileActions {
  /** File Actions */
  loadFiles: (folderId: string, format?: ResourceFormatKey) => Promise<void>;
  editFileName: (
    folderId: string,
    fileId: string,
    updatedName: string
  ) => Promise<void>;
  deleteManyFiles: () => Promise<void>;
  shareManyFiles: () => Promise<void>;
  moveFiles: () => Promise<void>;
}

export type FilesStoreType = StoreStateProps &
  StoreFolderActions &
  StoreFileActions;
