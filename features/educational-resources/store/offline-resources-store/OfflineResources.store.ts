import { and, eq, inArray, like } from "drizzle-orm";
import * as Sharing from "expo-sharing";
import { create } from "zustand";

import { db } from "@/core/config/db/drizzleClient";
import { resourcesTable } from "@/core/config/db/schema";

import { PaginatedResponse } from "@/core/types";
import { EducationalResource, ResourceFormatKey } from "../../types";
import { OfflineResourcesStoreType } from "./store-types";

import { eventBus } from "@/core/events/EventBus";
import { showToast } from "@/shared/context";

import { generateToastKey } from "@/shared/helpers";
import { tryCatchWrapper } from "@/shared/utils";
import { ResourceManager } from "../../utils";

import { i18n } from "@/core/store";
import { ResourcesSelectionStore } from "../resources-selection-store/ResourcesSelection.store";

export const OfflineResourcesStore = create<OfflineResourcesStoreType>(
  (set) => ({
    isProcessing: false,
    isLoading: false,
    isSharing: false,
    createResource: async (createResourcePayload, toast) => {
      const { title, resourceId, content, format, formatKey, groupTag } =
        createResourcePayload;
      set({ isProcessing: true });
      return await tryCatchWrapper(
        async () => {
          const addedResourceRow = await db
            .insert(resourcesTable)
            .values({ title, resourceId, content, format, formatKey, groupTag })
            .returning();

          return {
            ...addedResourceRow[0],
            sync: addedResourceRow[0].sync === "false" ? false : true,
            formatKey: addedResourceRow[0].formatKey as ResourceFormatKey,
            creationDate: new Date(addedResourceRow[0].creationDate),
          };
        },
        (error) => {
          showToast({
            key: generateToastKey(),
            variant: "danger",
            message: error.message,
          });
        },
        () => {
          set({ isProcessing: false });
        },
      );
    },
    findResources: async (filters) => {
      const { page, title, formatKey, tag, limit } = filters;

      const parsedLimit = parseInt(limit ?? "10");
      const parsedPage = parseInt(page ?? "1");

      set({ isLoading: true });

      return await tryCatchWrapper(
        async () => {
          const resources = await db
            .select()
            .from(resourcesTable)
            .where(
              title && formatKey && tag
                ? and(
                    eq(resourcesTable.formatKey, formatKey),
                    eq(resourcesTable.groupTag, tag),
                    like(resourcesTable.title, `%${title}%`),
                  )
                : title
                  ? like(resourcesTable.title, `%${title}%`)
                  : formatKey
                    ? eq(resourcesTable.formatKey, formatKey)
                    : tag
                      ? eq(resourcesTable.groupTag, tag)
                      : title && formatKey
                        ? and(
                            eq(resourcesTable.formatKey, formatKey),
                            like(resourcesTable.title, `%${title}%`),
                          )
                        : title && tag
                          ? and(
                              eq(resourcesTable.groupTag, tag),
                              like(resourcesTable.title, `%${title}%`),
                            )
                          : formatKey && tag
                            ? and(
                                eq(resourcesTable.groupTag, tag),
                                eq(resourcesTable.formatKey, formatKey),
                              )
                            : undefined,
            )
            .limit(parsedLimit)
            .offset((parsedPage - 1) * parsedLimit);

          const totalItems = await db.$count(resourcesTable);

          const parsedRecords: EducationalResource[] = resources.map((r) => ({
            ...r,
            formatKey: r.formatKey as ResourceFormatKey,
            sync: r.sync === "false" ? false : true,
            creationDate: new Date(r.creationDate),
          }));

          const response: PaginatedResponse<EducationalResource> = {
            records: parsedRecords,
            page: parsedPage,
            limit: parsedLimit,
            totalPages: 0,
            totalItems,
          };

          return response;
        },
        (error) => {
          showToast({
            key: generateToastKey(),
            variant: "danger",
            message: error.message,
          });
        },
        () => {
          set({ isLoading: false });
        },
      );
    },
    findResourceById: async (resourceId) => {
      set({ isLoading: true });
      return await tryCatchWrapper(
        async () => {
          const resourceRow = await db
            .select()
            .from(resourcesTable)
            .where(eq(resourcesTable.resourceId, resourceId));

          if (resourceRow.length === 0) {
            showToast({
              key: generateToastKey(),
              variant: "danger",
              message: `${i18n.t(
                "resources_translations.module_error_messages.resource_not_found_msg",
              )} ${resourceId}`,
            });
            return null;
          }

          return {
            ...resourceRow[0],
            formatKey: resourceRow[0].formatKey as ResourceFormatKey,
            sync: resourceRow[0].sync === "false" ? false : true,
            creationDate: new Date(resourceRow[0].creationDate),
          };
        },
        (error) => {
          showToast({
            key: generateToastKey(),
            variant: "danger",
            message: error.message,
          });
        },
        () => {
          set({ isLoading: false });
        },
      );
    },
    updateResource: async (updateResourcePayload) => {
      const { title, groupTag, resourceId } = updateResourcePayload;
      set({ isProcessing: true });

      return await tryCatchWrapper(
        async () => {
          const updatedResourceRow = await db
            .update(resourcesTable)
            .set({ title, groupTag, sync: "false" })
            .where(eq(resourcesTable.resourceId, resourceId))
            .returning();

          if (updatedResourceRow.length === 0) {
            const errorMsg = `${i18n.t(
              "resources_translations.module_error_messages.resource_not_found_msg",
            )} ${resourceId}`;
            showToast({
              key: generateToastKey(),
              variant: "danger",
              message: errorMsg,
            });
            throw new Error(errorMsg);
          }

          return {
            ...updatedResourceRow[0],
            formatKey: updatedResourceRow[0].formatKey as ResourceFormatKey,
            sync: updatedResourceRow[0].sync === "false" ? false : true,
            creationDate: new Date(updatedResourceRow[0].creationDate),
          };
        },
        (error) => {
          showToast({
            key: generateToastKey(),
            variant: "danger",
            message: error.message,
          });
        },
        () => {
          set({ isProcessing: false });
        },
      );
    },
    deleteManyResources: async () => {
      const { selectedResourceIds, clearSelection } =
        ResourcesSelectionStore.getState();

      const selectedResources = Array.from(selectedResourceIds);

      set({ isProcessing: true });
      tryCatchWrapper(
        async () => {
          const result = await db
            .delete(resourcesTable)
            .where(inArray(resourcesTable.resourceId, selectedResources));

          if (result.changes < selectedResources.length) {
            showToast({
              key: generateToastKey(),
              variant: "danger",
              message: i18n.t(
                "resources_translations.module_error_messages.some_resource_not_found_msg",
              ),
            });
            return;
          }
          clearSelection();
        },
        (error) => {
          showToast({
            key: generateToastKey(),
            variant: "danger",
            message: error.message,
          });
        },
        () => {
          set({ isProcessing: false });
        },
      );
    },
    updateResourcesSyncStatus: async (sync, resourceId) => {
      await tryCatchWrapper(
        async () => {
          if (resourceId) {
            await db
              .update(resourcesTable)
              .set({ sync: String(sync) })
              .where(eq(resourcesTable.resourceId, resourceId))
              .returning();
            return;
          }

          await db
            .update(resourcesTable)
            .set({ sync: String(sync) })
            .returning();
        },
        (error) => {
          showToast({
            key: generateToastKey(),
            variant: "danger",
            message: error.message,
          });
        },
      );
    },
    findAllResources: async () => {
      return await tryCatchWrapper(
        async () => {
          const resources = await db.select().from(resourcesTable);
          return resources.map((r) => ({
            ...r,
            formatKey: r.formatKey as ResourceFormatKey,
            sync: r.sync === "false" ? false : true,
            creationDate: new Date(r.creationDate),
          }));
        },
        (error) => {
          showToast({
            key: generateToastKey(),
            variant: "danger",
            message: error.message,
          });
        },
      );
    },

    shareResources: async (groupName) => {
      const { selectedResourceIds, clearSelection } =
        ResourcesSelectionStore.getState();

      const selectedResources = Array.from(selectedResourceIds);

      set({ isSharing: true });

      await tryCatchWrapper(
        async () => {
          const resources = await db
            .select()
            .from(resourcesTable)
            .where(inArray(resourcesTable.resourceId, selectedResources));

          const resourcesToShare = resources.map((resource) => ({
            ...resource,
            formatKey: resource.formatKey as ResourceFormatKey,
            creationDate: new Date(resource.creationDate),
            sync: resource.sync === "false" ? false : true,
          }));

          const downloadedResources =
            await ResourceManager.downloadResources(resourcesToShare);

          const zipPath = await ResourceManager.zipMultipleFiles(
            groupName,
            downloadedResources.map((file) => ({
              path: file.fileUri,
              name: file.name,
            })),
          );

          const canShare = await Sharing.isAvailableAsync();

          if (!canShare) {
            showToast({
              key: generateToastKey(),
              variant: "danger",
              message: i18n.t(
                "resources_translations.module_error_messages.share_function_no_available_msg",
              ),
            });
            return;
          }

          await Sharing.shareAsync(zipPath, {
            mimeType: "application/zip",
            dialogTitle: i18n.t(
              "resources_translations.file_sharing_dialog_title",
            ),
          });

          eventBus.emit(
            "dashboard.addDownloadedResources",
            resourcesToShare.length,
          );

          showToast({
            key: generateToastKey(),
            variant: "primary",
            message: i18n.t(
              "resources_translations.module_success_messages.resources_shared_successfully_msg",
            ),
          });

          clearSelection();

          setTimeout(() => {
            ResourceManager.clearTemporaryFiles();
            ResourceManager.cleanupTempZips();
          }, 5000);
        },
        (error) => {
          showToast({
            key: generateToastKey(),
            variant: "danger",
            message: error.message,
          });
        },
        () => set({ isSharing: false }),
      );
    },
  }),
);
