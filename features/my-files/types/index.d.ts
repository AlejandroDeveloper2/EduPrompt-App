type ResourceFormatKey = "text" | "image" | "chart" | "table";

interface DownloadedFile {
  fileId: string;
  name: string;
  fileExtension: string;
  fileUri: string;
  format: string;
  formatKey: ResourceFormatKey;
  downloadDate: string;
  fileSize: string;
}

interface Folder {
  folderId: string;
  folderName: string;
  files: DownloadedFile[];
  folderUri: string;
  creationDate: string;
}

export type { DownloadedFile, Folder, ResourceFormatKey };
