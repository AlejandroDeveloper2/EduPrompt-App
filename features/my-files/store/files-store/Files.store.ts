import { Directory, File } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { create } from "zustand";

import { DownloadedFile, Folder } from "../../types";
import { FileStoreType } from "./store-types";

import { BASE_DIRECTORY } from "../shared-types";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";
import { ZipHelper } from "../../utils";

import { tryCatchWrapper } from "@/shared/utils";
import { FilesSelectionStore } from "../files-selection-store/FilesSelection.store";
import { FoldersStore } from "../folders-store/Folders.store";

export const FilesStore = create<FileStoreType>((set, get) => ({
  folder: null,

  /** Files Actions */
  loadFilesByFormat: (folderId, format): void => {
    const folderPath = `${BASE_DIRECTORY}/${folderId}/`;
    const folderMetaPath = folderPath + "folder.meta.json";

    const folderRaw = new File(folderMetaPath).textSync();
    const folderMeta = JSON.parse(folderRaw) as Folder;

    set({
      folder: {
        ...folderMeta,
        files: format
          ? folderMeta.files.filter((file) => file.formatKey === format)
          : folderMeta.files,
      },
    });
  },
  editFileName: (folderId, fileId, updatedName): void => {
    const folderPath = `${BASE_DIRECTORY}/${folderId}/`;
    const metaPath = `${folderPath}${fileId}.meta.json`;
    const folderMetaPath = folderPath + "folder.meta.json";

    const fileRaw = new File(metaPath).textSync();
    const fileMeta = JSON.parse(fileRaw) as DownloadedFile;

    /** Actualizamos los metadatos del archivo */
    const updatedFile: DownloadedFile = { ...fileMeta, name: updatedName };

    new File(folderMetaPath).write(JSON.stringify(updatedFile), {
      encoding: "utf8",
    });

    /** Actualizamos los metadatos de la carpeta */
    const folderRaw = new File(folderMetaPath).textSync();
    const folderMeta = JSON.parse(folderRaw) as Folder;

    const updatedFolderMeta: Folder = {
      ...folderMeta,
      files: folderMeta.files.map((file) => {
        if (file.fileId === fileId) return updatedFile;
        return file;
      }),
    };

    new File(folderMetaPath).write(JSON.stringify(updatedFolderMeta), {
      encoding: "utf8",
    });

    /** Actualizamos el estado en memoria */
    FoldersStore.setState(({ folders }) => ({
      folders: folders.map((folder) => {
        if (folder.folderId === folderId) return updatedFolderMeta;
        return folder;
      }),
    }));
    set({ folder: updatedFolderMeta });

    showToast({
      key: generateToastKey(),
      variant: "primary",
      message: "Nombre de archivo actualizado exitosamente!",
    });
  },
  deleteManyFiles: (folderId): void => {
    const { selectedElementIds, clearSelection } =
      FilesSelectionStore.getState();

    const folderPath = `${BASE_DIRECTORY}/${folderId}/`;
    const folderMetaPath = folderPath + "folder.meta.json";

    const targetDirectory = new Directory(folderPath);

    if (!targetDirectory.exists) return;

    const directoryFiles = targetDirectory.list();

    /** Eliminamos los archivos seleccionados del directorio objetivo */
    directoryFiles.forEach((dirFile) => {
      const file = dirFile as File;
      if (selectedElementIds.has(file.name.split(".")[0])) file.delete();
    });

    /** Actualizamos los metadatos de la carpeta */
    const folderRaw = new File(folderMetaPath).textSync();
    const folderMeta = JSON.parse(folderRaw) as Folder;

    const updatedFolderMeta: Folder = {
      ...folderMeta,
      files: folderMeta.files.filter((f) => !selectedElementIds.has(f.fileId)),
    };

    new File(folderMetaPath).write(JSON.stringify(updatedFolderMeta), {
      encoding: "utf8",
    });

    /** Actualizamos el estado en memoria */
    FoldersStore.setState(({ folders }) => ({
      folders: folders.map((f) => {
        if (f.folderId === folderId) return updatedFolderMeta;
        return f;
      }),
    }));
    set({ folder: updatedFolderMeta });

    showToast({
      key: generateToastKey(),
      variant: "primary",
      message: "¡Archivos eliminados exitosamente!",
    });

    clearSelection();
  },
  shareManyFiles: async (folderId): Promise<void> => {
    const { folder } = get();
    const { selectedElementIds, clearSelection } =
      FilesSelectionStore.getState();

    await tryCatchWrapper(
      async () => {
        if (!folder || folder.folderId !== folderId) {
          showToast({
            key: generateToastKey(),
            variant: "danger",
            message: "Error: carpeta no encontrada",
          });
          return;
        }

        const selectedFiles = folder.files.filter((file) =>
          selectedElementIds.has(file.fileId)
        );

        if (selectedFiles.length === 0) {
          showToast({
            key: generateToastKey(),
            variant: "neutral",
            message: "No hay archivos seleccionados para compartir",
          });
          return;
        }

        showToast({
          key: generateToastKey(),
          variant: "primary",
          message: "Preparando archivos para compartir...",
        });

        const folderPath = `${BASE_DIRECTORY}/${folderId}/`;

        // Preparar rutas de archivos
        const filePaths = selectedFiles.map((file) => ({
          path: `${folderPath}${file.fileId}.${file.formatKey}`,
          name: `${file.name}.${file.formatKey}`,
        }));

        // Comprimir archivos
        const zipPath = await ZipHelper.zipMultipleFiles(filePaths);

        const canShare = await Sharing.isAvailableAsync();

        if (!canShare) {
          showToast({
            key: generateToastKey(),
            variant: "danger",
            message: "La función de compartir no está disponible",
          });
          return;
        }

        await Sharing.shareAsync(zipPath, {
          mimeType: "application/zip",
          dialogTitle: "Compartir archivos",
        });

        clearSelection();

        setTimeout(() => {
          ZipHelper.cleanupTempZips();
        }, 5000);
      },
      (error) => {
        console.error("Error al compartir archivos:", error);
        showToast({
          key: generateToastKey(),
          variant: "danger",
          message: "Error al compartir archivos",
        });
      }
    );
  },
  moveFiles: async (originFolderId: string, destinationFolderId: string) => {
    const { selectedElementIds, clearSelection } =
      FilesSelectionStore.getState();

    const originFolderPath = `${BASE_DIRECTORY}/${originFolderId}/`;
    const originFolderMetaPath = originFolderPath + "folder.meta.json";

    const destinationFolderPath = `${BASE_DIRECTORY}/${destinationFolderId}/`;
    const destinationFolderMetaPath =
      destinationFolderPath + "folder.meta.json";

    const originDirectory = new Directory(originFolderPath);
    const destinationDirectory = new Directory(destinationFolderPath);

    if (!originDirectory.exists) return;
    if (!destinationDirectory.exists) return;

    const dirFiles = originDirectory.list() as File[];
    const movedFiles: DownloadedFile[] = [];

    /** Movemos los archivos seleccionados al directorio destino */
    dirFiles.forEach((dirFile) => {
      if (selectedElementIds.has(dirFile.name.split(".")[0])) {
        const metaFilePath = `${originFolderPath}${
          dirFile.name.split(".")[0]
        }.meta.json`;
        const fileRaw = new File(metaFilePath).textSync();
        const fileMeta = JSON.parse(fileRaw) as DownloadedFile;
        movedFiles.push(fileMeta);
        dirFile.move(destinationDirectory);
      }
    });

    /** Actualizamos metadatos del directorio origen */
    const originFolderRaw = new File(originFolderMetaPath).textSync();
    const originFolderMeta = JSON.parse(originFolderRaw) as Folder;

    const updatedOriginFolderMeta: Folder = {
      ...originFolderMeta,
      files: originFolderMeta.files.filter(
        (f) => !selectedElementIds.has(f.fileId)
      ),
    };

    new File(originFolderMetaPath).write(
      JSON.stringify(updatedOriginFolderMeta),
      {
        encoding: "utf8",
      }
    );

    /** Actualizamos metadatos del directorio de destino con los nuevos archivos movidos */
    const destinationFolderRaw = new File(destinationFolderMetaPath).textSync();
    const destinationFolderMeta = JSON.parse(destinationFolderRaw) as Folder;

    const updatedDestinationFolderMeta: Folder = {
      ...destinationFolderMeta,
      files: destinationFolderMeta.files.concat(movedFiles),
    };

    new File(destinationFolderMetaPath).write(
      JSON.stringify(updatedDestinationFolderMeta),
      {
        encoding: "utf8",
      }
    );

    /** Actualizamos el estado en memoria */
    FoldersStore.setState(({ folders }) => ({
      folders: folders.map((f) => {
        if (f.folderId === originFolderId) return updatedOriginFolderMeta;
        return f;
      }),
    }));

    set({ folder: updatedOriginFolderMeta });

    clearSelection();
  },
}));
