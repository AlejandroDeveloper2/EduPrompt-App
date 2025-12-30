import { and, eq, inArray, like } from "drizzle-orm";
import { create } from "zustand";

import { PaginatedResponse } from "@/core/types";
import { Prompt } from "../../types";
import { OfflinePromptsStoreType } from "./store-types";

import { db } from "@/core/config/db/drizzleClient";
import { promptsTable } from "@/core/config/db/schema";

import { showToast } from "@/shared/context";

import { PromptsSelectionStore } from "../prompts-selection-store/PromptsSelection.store";

import { generateToastKey } from "@/shared/helpers";
import { tryCatchWrapper } from "@/shared/utils";

export const OfflinePromptsStore = create<OfflinePromptsStoreType>(
  (set, get) => ({
    isProcessing: false,
    isLoading: false,

    createPrompt: async (createPromptPayload, toast) => {
      const { promptId, promptTitle, promptText, tag } = createPromptPayload;
      set({ isProcessing: true });
      return tryCatchWrapper(
        async () => {
          const addedPromptRow = await db
            .insert(promptsTable)
            .values({ promptId, promptTitle, promptText, tag })
            .returning();

          if (toast)
            showToast({
              key: generateToastKey(),
              variant: "primary",
              message: "Prompt creado correctamente",
            });

          return {
            ...addedPromptRow[0],
            sync: addedPromptRow[0].sync === "false" ? false : true,
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
    findPrompts: async (filters) => {
      const { page, title, tag, limit } = filters;

      const parsedLimit = parseInt(limit ?? "10");
      const parsedPage = parseInt(page ?? "1");

      set({ isLoading: true });

      return await tryCatchWrapper(
        async () => {
          const prompts = await db
            .select()
            .from(promptsTable)
            .where(
              tag && title
                ? and(
                    eq(promptsTable.tag, tag),
                    like(promptsTable.promptTitle, `%${title}%`)
                  )
                : title
                ? like(promptsTable.promptTitle, `%${title}%`)
                : tag
                ? eq(promptsTable.tag, tag)
                : undefined
            )
            .limit(parsedLimit)
            .offset((parsedPage - 1) * parsedLimit);

          const totalItems = await db.$count(promptsTable);

          const parsedRecords: Prompt[] = prompts.map((p) => ({
            ...p,
            sync: p.sync === "false" ? false : true,
          }));

          const response: PaginatedResponse<Prompt> = {
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
    findPromptById: async (promptId) => {
      set({ isLoading: true });
      return await tryCatchWrapper(
        async () => {
          const promptRow = await db
            .select()
            .from(promptsTable)
            .where(eq(promptsTable.promptId, promptId));

          if (promptRow.length === 0) {
            showToast({
              key: generateToastKey(),
              variant: "danger",
              message: `No se ha encontrado ningún prompt con el id: ${promptId}`,
            });
            return null;
          }

          return {
            ...promptRow[0],
            sync: promptRow[0].sync === "false" ? false : true,
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
    updatePrompt: async (updatePromptPayload) => {
      const { promptText, promptTitle, tag, promptId } = updatePromptPayload;
      set({ isProcessing: true });

      return await tryCatchWrapper(
        async () => {
          const updatedPromptRow = await db
            .update(promptsTable)
            .set({ promptText, promptTitle, tag, sync: "false" })
            .where(eq(promptsTable.promptId, promptId))
            .returning();

          if (updatedPromptRow.length === 0) {
            const errorMsg = `No se ha encontrado ningún prompt con el id: ${promptId}`;
            showToast({
              key: generateToastKey(),
              variant: "danger",
              message: errorMsg,
            });
            throw new Error(errorMsg);
          }

          return {
            ...updatedPromptRow[0],
            sync: updatedPromptRow[0].sync === "false" ? false : true,
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
    deleteManyPrompts: async () => {
      const { selectedPromptIds, clearSelection } =
        PromptsSelectionStore.getState();

      const selectedPrompts = Array.from(selectedPromptIds);

      set({ isProcessing: true });
      tryCatchWrapper(
        async () => {
          const result = await db
            .delete(promptsTable)
            .where(inArray(promptsTable.promptId, selectedPrompts));

          if (result.changes < selectedPrompts.length) {
            showToast({
              key: generateToastKey(),
              variant: "danger",
              message:
                "Algun prompt de la lista no se existe en la base de datos",
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
    updatePromptsSyncStatus: async (sync, promptId) => {
      await tryCatchWrapper(
        async () => {
          if (promptId) {
            await db
              .update(promptsTable)
              .set({ sync: String(sync) })
              .where(eq(promptsTable.promptId, promptId))
              .returning();
            return;
          }

          await db
            .update(promptsTable)
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
    findAllPrompts: async () => {
      return await tryCatchWrapper(
        async () => {
          const prompts = await db.select().from(promptsTable);
          return prompts.map((p) => ({
            ...p,
            sync: p.sync === "false" ? false : true,
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
  })
);
