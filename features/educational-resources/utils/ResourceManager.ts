import { Directory, File, Paths } from "expo-file-system";
import JSZip from "jszip";

import { EducationalResource, FileMetadata } from "../types";

const TEMP_ZIP_DIR = Paths.cache.uri + "temp_zips/";
const TEMP_FILES_DIR = Paths.cache.uri + "temp_files/";

export class ResourceManager {
  private static getFileExtension(formatKey: string): string {
    if (formatKey === "text") return "txt";
    if (formatKey === "image") return "webp";
    return "pdf";
  }

  private static ensureDirectoryExists(dirPath: string): void {
    const dir = new Directory(dirPath);
    if (!dir.info().exists) {
      dir.create({ intermediates: true });
    }
  }

  private static async downloadResource(
    resource: EducationalResource,
  ): Promise<FileMetadata | null> {
    try {
      //1. Creamos un archivo temporal con el contenido del recurso
      const { formatKey, content, title, format } = resource;
      const fileExtension = this.getFileExtension(formatKey);
      const fileName = `${title.replace(/\s+/g, "_")}.${fileExtension}`;
      const filePath = `${TEMP_FILES_DIR}${fileName}`;

      // Crear el directorio temporal si no existe
      this.ensureDirectoryExists(TEMP_FILES_DIR);

      console.log(`Descargando recurso: ${title} en ${filePath}`);

      const file = new File(filePath);
      file.create();

      //2. Escribimos el contenido en el archivo dependiendo del formato
      if (fileExtension === "txt") {
        file.write(content, { encoding: "utf8" });
      } else if (fileExtension === "webp") {
        file.write(content.split(",")[1], { encoding: "base64" });
      } else if (fileExtension === "pdf") {
        file.write(content, { encoding: "base64" });
      }

      //3. Creamos un objeto con los metadatos del archivo
      const meta: FileMetadata = {
        fileId: resource.resourceId,
        name: fileName,
        fileExtension,
        fileUri: filePath,
        format,
        formatKey,
        downloadDate: file.creationTime
          ? new Date(file.creationTime).toISOString()
          : new Date().toISOString(),
        fileSize: file.size
          ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
          : "Unknown",
      };

      return meta;
    } catch (error: unknown) {
      console.log(error);
      return null;
    }
  }

  static async downloadResources(
    resources: EducationalResource[],
  ): Promise<FileMetadata[]> {
    const downloadPromises = resources.map((resource) =>
      this.downloadResource(resource),
    );
    const results = await Promise.all(downloadPromises);
    return results.filter((v): v is FileMetadata => !!v);
  }

  static clearTemporaryFiles(): void {
    try {
      const cacheDir = new Directory(TEMP_FILES_DIR);
      if (cacheDir.info().exists) {
        cacheDir.delete();
      }
      cacheDir.create({ intermediates: true });
    } catch (error) {
      console.warn("Error al limpiar los archivos temporales:", error);
    }
  }

  static async zipMultipleFiles(
    groupName: string,
    files: { path: string; name: string }[],
  ): Promise<string> {
    console.log("Zipping files...", files);

    //1. Crear directorio temporal para los ZIPs si no existe
    this.ensureDirectoryExists(TEMP_ZIP_DIR);

    const zip = new JSZip();

    //2. Agregar cada archivo al ZIP
    for (const file of files) {
      const fileObj = new File(file.path);

      if (!fileObj.info().exists) {
        console.warn(`Archivo no encontrado: ${file.path}`);
        continue;
      }

      // Leer el archivo como base 64
      const fileContent = fileObj.base64Sync();

      // Agregar al ZIP
      zip.file(file.name, fileContent, { base64: true });
    }

    //3. Generar el archivo ZIP
    const zipContent = await zip.generateAsync({
      type: "base64",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });

    const zipPath = `${TEMP_ZIP_DIR}${groupName}.zip`;

    new File(zipPath).write(zipContent, { encoding: "base64" });

    return zipPath;
  }

  static cleanupTempZips(): void {
    try {
      const tempDir = new Directory(TEMP_ZIP_DIR);
      if (tempDir.info().exists) {
        tempDir.delete();
      }
      tempDir.create({ intermediates: true });
    } catch (error) {
      console.warn("Error al limpiar ZIPs temporales:", error);
    }
  }
}
