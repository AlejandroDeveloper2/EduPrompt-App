import type { z } from "zod";

import type { FormErrors } from "@/core/types";

/**
 * Mapea los errores de validación de Zod a un formato compatible con formularios.
 *
 * Esta función transforma un objeto de tipo `ZodError` en una estructura
 * de errores que puede ser fácilmente utilizada por un formulario.
 * Soporta tanto errores en campos simples como errores en campos anidados
 * dentro de arrays (por ejemplo, listas de objetos).
 *
 * @template T - Tipo genérico que representa la estructura de los valores del formulario.
 *
 * @param {z.ZodError} zodError - Objeto de error generado por Zod tras validar un esquema.
 *
 * @returns {FormErrors<T>} Un objeto que contiene los errores de validación
 * organizados por campo. Cada clave corresponde a un campo del formulario:
 * - En campos simples: un array de mensajes de error (`string[]`).
 * - En campos anidados (por ejemplo, arrays de objetos): un array de objetos,
 *   donde cada objeto contiene los errores específicos de cada índice.
 *
 * @example
 * // Ejemplo de error simple
 * const schema = z.object({ name: z.string().min(1, "El nombre es obligatorio") });
 * const result = schema.safeParse({ name: "" });
 *
 * if (!result.success) {
 *   const errors = mapZodErrorsToFormErrors(result.error);
 *   console.log(errors);
 *   // Resultado:
 *   // { name: ["El nombre es obligatorio"] }
 * }
 *
 * @example
 * // Ejemplo de error en campo anidado
 * const schema = z.object({
 *   items: z.array(z.object({ title: z.string().min(1, "El título es obligatorio") }))
 * });
 * const result = schema.safeParse({ items: [{ title: "" }] });
 *
 * if (!result.success) {
 *   const errors = mapZodErrorsToFormErrors(result.error);
 *   console.log(errors);
 *   // Resultado:
 *   // { items: [ { title: ["El título es obligatorio"] } ] }
 * }
 */
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
