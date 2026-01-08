import { Folder, ResourceFormatKey } from "../../types";

export interface FileStoreType {
  folder: Folder | null;
  /** File Actions */
  loadFilesByFormat: (folderId: string, format?: ResourceFormatKey) => void;
  editFileName: (folderId: string, fileId: string, updatedName: string) => void;
  deleteManyFiles: (folderId: string) => void;
  shareManyFiles: (folderId: string) => Promise<void>;
  moveFiles: (
    originFolderId: string,
    destinationFolderId: string
  ) => Promise<void>;
}
