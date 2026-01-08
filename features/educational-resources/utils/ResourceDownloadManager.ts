import { Directory, File, Paths } from "expo-file-system";
import uuid from "react-native-uuid";

import { DownloadedFile, Folder } from "@/features/my-files/types";
import { EducationalResource } from "../types";

type FileExtensionType = "pdf" | "webp" | "txt";

const BASE_DIRECTORY = Paths.document.uri + "eduprompt_downloads";

const bytesToMB = (bytes: number): string => {
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
};

export class ResourceDownloadManager {
  private static findFolderById(folderId: string): Folder | undefined {
    const baseDir = new Directory(BASE_DIRECTORY);
    /** Validamos si existe el directorio base */
    if (!baseDir.info().exists) {
      baseDir.create({ intermediates: true });
    }

    const { files: folders } = baseDir.info();

    if (!folders) return;

    const result: Folder[] = [];

    for (const folder of folders) {
      const folderPath = `${BASE_DIRECTORY}/${folder}/`;
      const metaPath = folderPath + "folder.meta.json";

      const fileInfo = new File(metaPath).info();
      if (!fileInfo.exists) continue;

      const raw = new File(metaPath).textSync();
      result.push(JSON.parse(raw) as Folder);
    }

    return result.find((r) => r.folderId === folderId);
  }
  private static createFolder(
    createfolderInput: Pick<Folder, "folderId" | "folderName">
  ): Folder {
    const folderPath = `${BASE_DIRECTORY}/${createfolderInput.folderId}/`;

    new Directory(folderPath).create({ intermediates: true });

    const metaPath = folderPath + "folder.meta.json";

    const meta: Folder = {
      ...createfolderInput,
      folderUri: folderPath,
      creationDate: new Date().toISOString(),
      files: [],
    };

    new File(metaPath).write(JSON.stringify(meta), { encoding: "utf8" });

    return meta;
  }

  private static getFilePath(
    folderId: string,
    file: Omit<DownloadedFile, "fileUri" | "downloadDate">
  ): string {
    /** Ruta de la carpeta */
    const folderPath = `${BASE_DIRECTORY}/${folderId}/`;
    /** Ruta del archivo */
    const filePath = `${folderPath}${file.fileId}.${file.fileExtension}`;

    return filePath;
  }
  private static saveFileMetadataInFolder(
    folderId: string,
    file: DownloadedFile
  ): void {
    const folderPath = `${BASE_DIRECTORY}/${folderId}/`;
    const metaPath = `${folderPath}${file.fileId}.meta.json`;
    const folderMetaPath = folderPath + "folder.meta.json";

    /** Guardamos metadatos del archivo */
    new File(metaPath).write(JSON.stringify(file), { encoding: "utf8" });

    /** Actualizamos metadatos de la carpeta */
    const folderRaw = new File(folderMetaPath).textSync();
    const folderMeta = JSON.parse(folderRaw) as Folder;

    folderMeta.files.push(file);

    new File(folderMetaPath).write(JSON.stringify(folderMeta), {
      encoding: "utf8",
    });
  }

  private static downloadSingleResource(
    resource: Pick<
      EducationalResource,
      "formatKey" | "content" | "groupTag" | "title" | "format"
    >
  ): void {
    const { formatKey, content, groupTag, title, format } = resource;

    // PASO 1: Asegurar que la carpeta existe PRIMERO
    let folder = this.findFolderById(groupTag);
    if (!folder) {
      folder = this.createFolder({
        folderId: groupTag,
        folderName: title,
      });
    }

    // PASO 2: Determinar extensión del archivo
    const fileExtension: FileExtensionType =
      formatKey === "text" ? "txt" : formatKey === "image" ? "webp" : "pdf";

    // PASO 3: Crear objeto de archivo base (sin fileUri ni downloadDate aún)
    const fileId = uuid.v4();
    let downloadedFile: Omit<DownloadedFile, "fileUri" | "downloadDate"> = {
      fileId,
      name: title,
      fileExtension,
      format,
      formatKey,
      fileSize: "",
    };

    // PASO 4: Obtener la ruta del archivo (ahora la carpeta YA existe)
    const filePath = this.getFilePath(groupTag, downloadedFile);

    // PASO 5: Escribir el archivo según su tipo
    const file = new File(filePath);

    if (fileExtension === "txt") {
      file.write(content, { encoding: "utf8" });
    } else if (fileExtension === "webp") {
      file.write(content.split(",")[1], { encoding: "base64" });
    } else if (fileExtension === "pdf") {
      file.write(content, { encoding: "base64" });
    }

    // PASO 6: Obtener el tamaño del archivo
    const { size } = file.info();
    const fileSize = bytesToMB(size ?? 0);

    // PASO 7: Crear el objeto completo de archivo descargado
    const completeDownloadedFile: DownloadedFile = {
      ...downloadedFile,
      fileSize,
      fileUri: filePath,
      downloadDate: new Date().toISOString(),
    };

    // PASO 8: Guardar metadatos del archivo en la carpeta
    this.saveFileMetadataInFolder(groupTag, completeDownloadedFile);
  }

  static downloadResourcesConcurrenly(
    resources: Pick<
      EducationalResource,
      "formatKey" | "content" | "groupTag" | "title" | "format"
    >[]
  ): void {
    // Asegurar que el directorio base existe
    const baseDir = new Directory(BASE_DIRECTORY);
    if (!baseDir.info().exists) {
      baseDir.create({ intermediates: true });
    }

    for (const resource of resources) {
      try {
        this.downloadSingleResource(resource);
      } catch (error) {
        console.error(`Error descargando recurso ${resource.title}:`, error);
      }
    }
  }
}
