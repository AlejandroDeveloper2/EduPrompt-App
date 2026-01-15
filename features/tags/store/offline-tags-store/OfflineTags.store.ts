import { and, eq, inArray, like } from "drizzle-orm";
import { create } from "zustand";

import { db } from "@/core/config/db/drizzleClient";
import { tagsTable } from "@/core/config/db/schema";

import { PaginatedResponse } from "@/core/types";
import {
  CreateTagPayload,
  Tag,
  TagFilters,
  TagType,
  UpdateTagPayload,
} from "../../types";
import { OfflineTagsStoreType } from "./store-types";

import { showToast } from "@/shared/context";

import { i18n } from "@/core/store";

import { generateToastKey } from "@/shared/helpers";
import { tryCatchWrapper } from "@/shared/utils";
import { TagsSelectionStore } from "../tags-selection-store/TagsSelection.store";

export const OfflineTagsStore = create<OfflineTagsStoreType>((set, get) => ({
  isLoading: false,
  isProcessing: false,
  createTag: async (createTagPayload: CreateTagPayload, toast?: boolean) => {
    const { name, type, tagId } = createTagPayload;
    set({ isProcessing: true });
    return await tryCatchWrapper(
      async () => {
        const addedTagRow = await db
          .insert(tagsTable)
          .values({ tagId, name, type })
          .returning();

        return {
          ...addedTagRow[0],
          sync: addedTagRow[0].sync === "false" ? false : true,
          type: addedTagRow[0].type as TagType,
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
      }
    );
  },
  findTagById: async (tagId: string) => {
    set({ isLoading: true });
    return await tryCatchWrapper(
      async () => {
        const tagRow = await db
          .select()
          .from(tagsTable)
          .where(eq(tagsTable.tagId, tagId));

        if (tagRow.length === 0) {
          showToast({
            key: generateToastKey(),
            variant: "danger",
            message: `${i18n.t(
              "tags-translations.module-error-messages.tag-not-found-msg"
            )} ${tagId}`,
          });
          return null;
        }

        return {
          tagId: tagRow[0].tagId,
          name: tagRow[0].name,
          type: tagRow[0].type as TagType,
          sync: tagRow[0].sync === "false" ? false : true,
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
      }
    );
  },
  findTags: async (filters: TagFilters) => {
    const { page, name, type, limit } = filters;

    const parsedLimit = parseInt(limit ?? "10");
    const parsedPage = parseInt(page ?? "1");

    set({ isLoading: true });

    return await tryCatchWrapper(
      async () => {
        const tags = await db
          .select()
          .from(tagsTable)
          .where(
            name
              ? and(eq(tagsTable.type, type), like(tagsTable.name, `%${name}%`))
              : and(eq(tagsTable.type, type))
          )
          .limit(parsedLimit)
          .offset((parsedPage - 1) * parsedLimit);

        const totalItems = await db.$count(tagsTable);

        const parsedRecords: Tag[] = tags.map((t) => ({
          ...t,
          type: t.type as TagType,
          sync: t.sync === "false" ? false : true,
        }));

        const response: PaginatedResponse<Tag> = {
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
      }
    );
  },
  updateTag: async (updateTagPayload: UpdateTagPayload) => {
    const { name, type, tagId } = updateTagPayload;
    set({ isProcessing: true });
    return await tryCatchWrapper(
      async () => {
        const updatedTagRow = await db
          .update(tagsTable)
          .set({ name, type, sync: "false" })
          .where(eq(tagsTable.tagId, tagId))
          .returning();

        if (updatedTagRow.length === 0) {
          const errorMsg = `${i18n.t(
            "tags-translations.module-error-messages.tag-not-found-msg"
          )} ${tagId}`;
          showToast({
            key: generateToastKey(),
            variant: "danger",
            message: errorMsg,
          });
          throw new Error(errorMsg);
        }

        return {
          ...updatedTagRow[0],
          sync: updatedTagRow[0].sync === "false" ? false : true,
          type: updatedTagRow[0].type as TagType,
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
      }
    );
  },
  deleteManyTags: async () => {
    const { selectedTagIds, clearSelection } = TagsSelectionStore.getState();

    const selectedTags = Array.from(selectedTagIds);

    set({ isProcessing: true });
    tryCatchWrapper(
      async () => {
        const result = await db
          .delete(tagsTable)
          .where(inArray(tagsTable.tagId, selectedTags));

        if (result.changes < selectedTags.length) {
          showToast({
            key: generateToastKey(),
            variant: "danger",
            message: i18n.t(
              "tags-translations.module-error-messages.some-tag-not-found-msg"
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
      }
    );
  },
  updateTagsSyncStatus: async (sync: boolean, tagId?: string) => {
    await tryCatchWrapper(
      async () => {
        if (tagId) {
          await db
            .update(tagsTable)
            .set({ sync: String(sync) })
            .where(eq(tagsTable.tagId, tagId))
            .returning();
          return;
        }

        await db
          .update(tagsTable)
          .set({ sync: String(sync) })
          .returning();
      },
      (error) => {
        showToast({
          key: generateToastKey(),
          variant: "danger",
          message: error.message,
        });
      }
    );
  },
  findAllTags: async () => {
    return await tryCatchWrapper(
      async () => {
        const tags = await db.select().from(tagsTable);
        return tags.map((t) => ({
          ...t,
          type: t.type as TagType,
          sync: t.sync === "false" ? false : true,
        }));
      },
      (error) => {
        showToast({
          key: generateToastKey(),
          variant: "danger",
          message: error.message,
        });
      }
    );
  },
}));
