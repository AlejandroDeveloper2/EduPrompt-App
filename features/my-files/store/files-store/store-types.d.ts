import { ResourceFormatKey } from "../../types";

export interface FileStoreType {
  isSharing: boolean;
  /** File Actions */
  loadFilesByFormat: (folderId: string, format?: ResourceFormatKey) => void;
  editFileName: (folderId: string, fileId: string, updatedName: string) => void;
  deleteManyFiles: (folderId: string) => void;
  shareManyFiles: (folderId: string) => Promise<void>;
  moveFiles: (originFolderId: string, destinationFolderId: string) => void;
}
