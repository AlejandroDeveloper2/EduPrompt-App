import { z } from "zod";

export const resourceDescriptionFormSchema = z.object({
  descriptionPrompt: z
    .string()
    .min(1, "La descripción del recurso es obligatorio"),
});

export const savePromptFormSchema = z.object({
  promptTitle: z.string().min(1, ""),
  promptText: z.string().min(1, ""),
  tag: z.string().min(1, ""),
});

export type ResourceDescriptionFormData = z.infer<
  typeof resourceDescriptionFormSchema
>;

export type SavePromptFormData = z.infer<typeof savePromptFormSchema>;
