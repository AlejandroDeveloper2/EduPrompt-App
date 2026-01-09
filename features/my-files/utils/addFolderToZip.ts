import { Directory, File } from "expo-file-system";
import JSZip from "jszip";

export const addFolderToZip = (
  zip: JSZip,
  folderPath: string,
  folderName: string
): void => {
  const folderDir = new Directory(folderPath);

  if (!folderDir.info().exists) {
    console.warn(`Carpeta no encontrada: ${folderPath}`);
    return;
  }

  const items = folderDir.list();

  for (const item of items) {
    const itemPath = folderPath + item.name;

    // Si es un directorio, recursión
    if (item instanceof Directory) {
      addFolderToZip(zip, itemPath + "/", `${folderName}/${item.name}`);
    }
    // Si es un archivo, agregarlo al ZIP
    else if (item instanceof File) {
      try {
        const fileContent = new File(itemPath).base64();
        zip.file(`${folderName}/${item.name}`, fileContent, { base64: true });
      } catch (error) {
        console.warn(`Error al leer archivo ${itemPath}:`, error);
      }
    }
  }
};
