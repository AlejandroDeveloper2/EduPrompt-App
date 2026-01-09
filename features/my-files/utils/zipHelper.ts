import { Directory, File, Paths } from "expo-file-system";
import JSZip from "jszip";

import { addFolderToZip } from "./addFolderToZip";

const TEMP_ZIP_DIR = Paths.cache.uri + "temp_zips/";

export class ZipHelper {
  static async zipFolder(
    folderPath: string,
    folderName: string
  ): Promise<string> {
    const tempDir = new Directory(TEMP_ZIP_DIR);

    if (!tempDir.info().exists) {
      tempDir.create({ intermediates: true });
    }

    const zip = new JSZip();

    const folderDir = new Directory(folderPath);

    if (!folderDir.info().exists) {
      throw new Error("La carpeta no existe");
    }

    // Agregar todos los archivos de la carpeta al ZIP
    addFolderToZip(zip, folderPath, folderName);

    // Generar el archivo ZIP
    const zipContent = await zip.generateAsync({
      type: "base64",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });

    const zipPath = `${TEMP_ZIP_DIR}${folderName}_${Date.now()}.zip`;

    // Escribir el archivo ZIP
    new File(zipPath).write(zipContent, { encoding: "base64" });

    return zipPath;
  }

  static async zipMultipleFolders(
    folderPaths: { path: string; name: string }[]
  ): Promise<string> {
    const tempDir = new Directory(TEMP_ZIP_DIR);
    if (!tempDir.info().exists) {
      tempDir.create({ intermediates: true });
    }

    const zip = new JSZip();

    // Agregar cada carpeta al ZIP
    for (const folder of folderPaths) {
      addFolderToZip(zip, folder.path, folder.name);
    }

    // Generar el archivo ZIP
    const zipContent = await zip.generateAsync({
      type: "base64",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });

    const zipPath = `${TEMP_ZIP_DIR}carpetas_${Date.now()}.zip`;

    new File(zipPath).write(zipContent, { encoding: "base64" });

    return zipPath;
  }

  static async zipMultipleFiles(
    files: { path: string; name: string }[]
  ): Promise<string> {
    const tempDir = new Directory(TEMP_ZIP_DIR);
    if (!tempDir.info().exists) {
      tempDir.create({ intermediates: true });
    }

    const zip = new JSZip();

    // Agregar cada archivo al ZIP
    for (const file of files) {
      const fileObj = new File(file.path);

      if (!fileObj.info().exists) {
        console.warn(`Archivo no encontrado: ${file.path}`);
        continue;
      }

      // Leer el archivo como base 64
      const fileContent = fileObj.base64Sync();

      // Agregar al ZIP
      zip.file(file.name, fileContent);
    }

    // Generar el archivo ZIP
    const zipContent = await zip.generateAsync({
      type: "base64",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });

    const zipPath = `${TEMP_ZIP_DIR}archivos_${Date.now()}.zip`;

    new File(zipPath).write(zipContent, { encoding: "base64" });

    return zipPath;
  }

  /**
   * Limpia archivos ZIP temporales antiguos
   */
  static cleanupTempZips(): void {
    try {
      const tempDir = new Directory(TEMP_ZIP_DIR);
      if (tempDir.info().exists) {
        tempDir.delete();
        tempDir.create({ intermediates: true });
      }
    } catch (error) {
      console.warn("Error al limpiar ZIPs temporales:", error);
    }
  }
}
