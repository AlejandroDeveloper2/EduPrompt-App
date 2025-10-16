import type { z } from "zod";

import type { FormErrors } from "@/core/types";

/** Función para mapear errores de zod */
export const mapZodErrorsToFormErrors = <T>(
  zodError: z.ZodError
): FormErrors<T> => {
  const formErrors: FormErrors<T> = {};

  zodError.issues.forEach((issue) => {
    const path = issue.path;

    if (path.length === 1) {
      // Error de campo simple
      const key = path[0] as keyof T;
      if (!formErrors[key]) {
        formErrors[key] = [] as unknown as FormErrors<T>[keyof T];
      }
      (formErrors[key] as string[]).push(issue.message);
    } else if (path.length > 1) {
      // Error en campo anidado (array de objetos)
      const arrayKey = path[0] as keyof T;
      const arrayIndex = path[1] as number;
      const nestedField = path[2] as string;

      if (!formErrors[arrayKey]) {
        formErrors[arrayKey] = [] as unknown as FormErrors<T>[keyof T];
      }

      const arrayErrors = formErrors[arrayKey] as unknown as (
        | Record<string, string[]>
        | undefined
      )[];

      if (!arrayErrors[arrayIndex]) {
        arrayErrors[arrayIndex] = {};
      }

      const nestedErrors = arrayErrors[arrayIndex] as Record<string, string[]>;
      if (!nestedErrors[nestedField]) {
        nestedErrors[nestedField] = [];
      }
      nestedErrors[nestedField].push(issue.message);
    }
  });

  return formErrors;
};
