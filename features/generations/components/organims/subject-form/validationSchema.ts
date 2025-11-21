import { z } from "zod";

export const subjectFormSchema = z.object({
  subjectName: z.string().min(1, "La materia es obligatoria"),
});

export type SubjectFormData = z.infer<typeof subjectFormSchema>;
