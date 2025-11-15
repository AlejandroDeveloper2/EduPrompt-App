import * as FileSystemLegacy from "expo-file-system/legacy";

import { AssistantResponse } from "../types";

export const getGeneratedImage = async (
  data: AssistantResponse
): Promise<AssistantResponse> => {
  const maybeBase64 = data.result ?? null;

  if (!maybeBase64)
    throw new Error(
      "No se encontro la cadena base64 en la respuesta del backend"
    );

  const rawBase64 = typeof maybeBase64 === "string" ? maybeBase64 : null;

  if (!rawBase64) throw new Error("Formato de base64 no reconocido.");

  const base64 = rawBase64.replace(/^data:image\/\w+;base64,/, "");

  const fileName = `generated_image_${new Date(
    data.generationDate
  ).getTime()}.png`;

  const cacheDir =
    FileSystemLegacy.cacheDirectory || FileSystemLegacy.documentDirectory || "";

  const fileUri = `${cacheDir}${fileName}`;

  try {
    await FileSystemLegacy.writeAsStringAsync(fileUri, base64, {
      encoding: FileSystemLegacy.EncodingType.Base64,
    });

    const info = await FileSystemLegacy.getInfoAsync(fileUri);

    if (!info.exists) {
      console.error("Archivo escrito pero no encontrado:", fileUri, info);
      throw new Error("El archivo no existe luego del write.");
    }

    return {
      ...data,
      result: fileUri,
    };
  } catch (error) {
    console.log("Error escribiendo imagen en filesystem:", error);
    throw error;
  }
};
