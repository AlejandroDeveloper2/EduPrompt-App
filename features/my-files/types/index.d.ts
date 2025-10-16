type ResourceFormatKey = "text" | "image" | "chart" | "table";

interface DownloadedResource {
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
  files: number;
  folderUri: string;
  creationDate: string;
}

export type { DownloadedResource, Folder, ResourceFormatKey };
