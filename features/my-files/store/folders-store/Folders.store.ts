import { compareAsc, compareDesc } from "date-fns";
import { Directory, File } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { create } from "zustand";

import { Folder } from "../../types";
import { FolderStoreType } from "./store-types";

import { BASE_DIRECTORY } from "../shared-types";

import { showToast } from "@/shared/context";
import { generateToastKey } from "@/shared/helpers";
import { tryCatchWrapper } from "@/shared/utils";
import { ZipHelper } from "../../utils";

import { FilesSelectionStore } from "../files-selection-store/FilesSelection.store";
import { SharedStore } from "../shared-store/Shared.store";

export const FoldersStore = create<FolderStoreType>((set, get) => ({
  isSharing: false,
  loadFolders: (orderBy): void => {
    const baseDir = new Directory(BASE_DIRECTORY);
    /** Validamos si existe el directorio base */
    if (!baseDir.info().exists) {
      baseDir.create({ intermediates: true });
    }

    const { files: folders } = baseDir.info();

    if (!folders) return;

    const folderList: Folder[] = [];

    for (const folder of folders) {
      const folderPath = `${BASE_DIRECTORY}/${folder}/`;
      const metaPath = folderPath + "folder.meta.json";

      const fileInfo = new File(metaPath).info();
      if (!fileInfo.exists) continue;

      const raw = new File(metaPath).textSync();
      folderList.push(JSON.parse(raw) as Folder);
    }

    const sortedFolders = folderList.sort((a, b) =>
      orderBy === "asc"
        ? compareAsc(new Date(a.creationDate), new Date(b.creationDate))
        : compareDesc(new Date(a.creationDate), new Date(b.creationDate))
    );
    SharedStore.setState({
      folders: sortedFolders,
    });
  },
  selectFolder: (folderId): void => {
    const folderPath = `${BASE_DIRECTORY}/${folderId}/`;
    const folderMetaPath = folderPath + "folder.meta.json";

    const folderRaw = new File(folderMetaPath).textSync();

    SharedStore.setState({
      folder: JSON.parse(folderRaw) as Folder,
    });
  },
  editFolderName: (folderId, updatedName): void => {
    const folderPath = `${BASE_DIRECTORY}/${folderId}/`;
    const folderMetaPath = folderPath + "folder.meta.json";

    const folderRaw = new File(folderMetaPath).textSync();
    const folderMeta = JSON.parse(folderRaw) as Folder;

    const updatedFolder: Folder = {
      ...folderMeta,
      folderName: updatedName,
    };

    new File(folderMetaPath).write(JSON.stringify(updatedFolder), {
      encoding: "utf8",
    });

    /** Actualizamos el estado en memoria */
    SharedStore.setState(({ folders }) => ({
      folders: folders.map((folder) => {
        if (folder.folderId === folderId) return updatedFolder;
        return folder;
      }),
      folder: updatedFolder,
    }));

    showToast({
      key: generateToastKey(),
      variant: "primary",
      message: "Nombre de la carpeta actualizado exitosamente!",
    });
  },
  deleteManyFolders: (): void => {
    const { folders } = SharedStore.getState();
    const { selectedElementIds, clearSelection } =
      FilesSelectionStore.getState();

    const selectedFoldersIds = Array.from(selectedElementIds);

    /** Eliminamos las carpetas seleccionadas */
    for (const folderId of selectedFoldersIds) {
      const folderPath = `${BASE_DIRECTORY}/${folderId}/`;
      const directory = new Directory(folderPath);
      if (!directory.exists) continue;
      directory.delete();
    }

    /** Actualizamos en memoria la lista de carpetas */
    const updatedFolders = folders.filter(
      (folder) => !selectedElementIds.has(folder.folderId)
    );
    SharedStore.setState({ folders: updatedFolders });

    showToast({
      key: generateToastKey(),
      variant: "primary",
      message: "Carpetas eliminadas exitosamente!",
    });

    clearSelection();
  },

  shareManyFolders: async (): Promise<void> => {
    const { folders } = SharedStore.getState();
    const { selectedElementIds, clearSelection } =
      FilesSelectionStore.getState();

    set({ isSharing: true });
    await tryCatchWrapper(
      async () => {
        const selectedFolders = folders.filter((folder) =>
          selectedElementIds.has(folder.folderId)
        );

        if (selectedFolders.length === 0) {
          showToast({
            key: generateToastKey(),
            variant: "neutral",
            message: "No hay carpetas seleccionadas para compartir",
          });
          return;
        }

        // Mostrar indicador de carga
        showToast({
          key: generateToastKey(),
          variant: "primary",
          message: "Preparando carpetas para compartir...",
        });

        // Preparar rutas de carpetas
        const folderPaths = selectedFolders.map((folder) => ({
          path: `${BASE_DIRECTORY}/${folder.folderId}/`,
          name: folder.folderName,
        }));

        // Comprimir carpetas
        const zipPath = await ZipHelper.zipMultipleFolders(folderPaths);

        // Verificar si el dispositivo puede compartir
        const canShare = await Sharing.isAvailableAsync();

        if (!canShare) {
          showToast({
            key: generateToastKey(),
            variant: "danger",
            message:
              "La función de compartir no está disponible en este dispositivo",
          });
          return;
        }

        // Compartir el archivo ZIP
        await Sharing.shareAsync(zipPath, {
          mimeType: "application/zip",
          dialogTitle: "Compartir carpetas",
        });

        // Limpiar selección
        clearSelection();

        // Opcional: limpiar ZIPs temporales después de compartir
        setTimeout(() => {
          ZipHelper.cleanupTempZips();
        }, 5000);
      },
      (error) => {
        console.error("Error al compartir carpetas:", error);
        showToast({
          key: generateToastKey(),
          variant: "danger",
          message: "Error al compartir carpetas",
        });
      },
      () => {
        set({ isSharing: false });
      }
    );
  },
}));
