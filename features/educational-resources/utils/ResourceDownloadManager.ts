import {
  documentDirectory,
  EncodingType,
  getInfoAsync,
  makeDirectoryAsync,
  writeAsStringAsync,
} from "expo-file-system/legacy";

import { EducationalResource } from "../types";

import { showToast } from "@/shared/context";

import { generateToastKey } from "@/shared/helpers";
import { tryCatchWrapper } from "@/shared/utils";

type FileExtensionType = "pdf" | "webp" | "txt";

export class ResourceDownloadManager {
  private static async getDirectoryUri(
    resourceFolderName: string
  ): Promise<string> {
    const directoryUri = documentDirectory + resourceFolderName;
    const directoryInfo = await getInfoAsync(directoryUri);

    if (!directoryInfo.exists) {
      await makeDirectoryAsync(directoryUri, { intermediates: true });
    }

    return directoryUri;
  }

  private static async generateUniqueFileName(
    directoryUri: string,
    baseName: string,
    extension: FileExtensionType
  ): Promise<string> {
    let fileName: string = `${baseName}.${extension}`;
    let counter = 1;

    while (
      await getInfoAsync(`${directoryUri}/${fileName}`).then((f) => f.exists)
    ) {
      fileName = `${baseName}_${counter}.${extension}`;
      counter++;
    }

    return fileName;
  }

  private static async buildResourceFileUri(
    resource: Pick<EducationalResource, "groupTag" | "title">,
    fileExtension: FileExtensionType
  ) {
    const { groupTag, title } = resource;
    const baseFolderName: string = "eduprompt_downloads";
    const resourceFolderName: string = `${baseFolderName}/${groupTag}`;

    const directoryUri: string = await this.getDirectoryUri(resourceFolderName);

    const fileName: string = await this.generateUniqueFileName(
      directoryUri,
      title,
      fileExtension
    );

    const fileUri: string = `${directoryUri}/${fileName}`;

    return fileUri;
  }

  static async downloadResourcesConcurrenly(
    resources: Pick<
      EducationalResource,
      "formatKey" | "content" | "groupTag" | "title"
    >[],
    concurrencyLimit: number = 10
  ): Promise<void> {
    const queue = [...resources];
    const errors: unknown[] = [];

    const workers = Array.from({ length: concurrencyLimit }).map(async () => {
      while (queue.length > 0) {
        const resource = queue.shift();

        if (!resource) break;

        try {
          await this.downloadSingleResource(resource);
        } catch (err) {
          errors.push(err);
        }
      }
    });

    await Promise.all(workers);

    if (errors.length > 0) {
      showToast({
        key: generateToastKey(),
        variant: "danger",
        message: `Errores ocurridos al intentar descargar los recursos educativos: (${errors.length})`,
      });
    }
  }

  static async downloadSingleResource(
    resource: Pick<
      EducationalResource,
      "formatKey" | "content" | "groupTag" | "title"
    >
  ): Promise<void> {
    const { formatKey, content, groupTag, title } = resource;

    await tryCatchWrapper(
      async () => {
        const fileExtension: FileExtensionType =
          formatKey === "text" ? "txt" : formatKey === "image" ? "webp" : "pdf";

        const fileUri = await this.buildResourceFileUri(
          { groupTag, title },
          fileExtension
        );

        if (fileExtension === "txt") {
          await writeAsStringAsync(fileUri, content, {
            encoding: EncodingType.UTF8,
          });
          return;
        }

        if (fileExtension === "webp") {
          await writeAsStringAsync(fileUri, content.split(",")[1], {
            encoding: EncodingType.Base64,
          });
          return;
        }

        if (fileExtension === "pdf") {
          await writeAsStringAsync(fileUri, content, {
            encoding: EncodingType.Base64,
          });
          return;
        }
      },
      (error) => {
        showToast({
          key: generateToastKey(),
          variant: "danger",
          message: error.message,
        });
      }
    );
  }
}
