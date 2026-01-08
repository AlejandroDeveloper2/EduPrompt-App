import { Directory, File, Paths } from "expo-file-system";
import { zip } from "react-native-zip-archive";

const TEMP_ZIP_DIR = Paths.cache.uri + "temp_zips";

export class ZipHelper {
  static async zipFolder(
    folderPath: string,
    folderName: string
  ): Promise<string> {
    const tempDir = new Directory(TEMP_ZIP_DIR);
    if (!tempDir.info().exists) {
      tempDir.create({ intermediates: true });
    }

    const zipPath = `${TEMP_ZIP_DIR}/${folderName}_${Date.now()}.zip`;

    await zip(folderPath, zipPath);

    return zipPath;
  }

  static async zipMultipleFolders(
    folderPaths: { path: string; name: string }[]
  ): Promise<string> {
    const tempDir = new Directory(TEMP_ZIP_DIR);
    if (!tempDir.info().exists) {
      tempDir.create({ intermediates: true });
    }

    // Crear un directorio temporal para agrupar las carpetas
    const tempGroupDir = `${TEMP_ZIP_DIR}/temp_group_${Date.now()}`;
    const groupDir = new Directory(tempGroupDir);
    groupDir.create({ intermediates: true });

    // Copiar todas las carpetas al directorio temporal
    for (const folder of folderPaths) {
      const sourceDir = new Directory(folder.path);
      const destinationPath = `${tempGroupDir}/${folder.name}`;
      sourceDir.copy(new Directory(destinationPath));
    }

    const zipPath = `${TEMP_ZIP_DIR}/carpetas_${Date.now()}.zip`;
    await zip(tempGroupDir, zipPath);

    // Limpiar directorio temporal
    groupDir.delete();

    return zipPath;
  }

  static async zipMultipleFiles(
    files: { path: string; name: string }[]
  ): Promise<string> {
    const tempDir = new Directory(TEMP_ZIP_DIR);
    if (!tempDir.info().exists) {
      tempDir.create({ intermediates: true });
    }

    // Crear directorio temporal para agrupar archivos
    const tempGroupDir = `${TEMP_ZIP_DIR}/temp_files_${Date.now()}`;
    const groupDir = new Directory(tempGroupDir);
    groupDir.create({ intermediates: true });

    // Copiar todos los archivos al directorio temporal
    for (const file of files) {
      const sourceFile = new File(file.path);
      const destinationPath = `${tempGroupDir}/${file.name}`;
      sourceFile.copy(new Directory(destinationPath));
    }

    const zipPath = `${TEMP_ZIP_DIR}/archivos_${Date.now()}.zip`;
    await zip(tempGroupDir, zipPath);

    // Limpiar directorio temporal
    groupDir.delete();

    return zipPath;
  }

  /**
   * Limpia archivos ZIP temporales antiguos
   */
  static cleanupTempZips(): void {
    const tempDir = new Directory(TEMP_ZIP_DIR);

    if (tempDir.info().exists) {
      tempDir.delete();
      tempDir.create({ intermediates: true });
    }
  }
}
