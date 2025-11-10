/**
 * Da formato a una fecha según la configuración regional especificada
 * @param locale - La cadena de configuración regional para formatear la fecha (ej., 'en-US', 'es-ES')
 * @param date - El objeto Date a formatear
 * @returns Una representación localizada de la fecha en formato "DD/MM/AAAA, HH:MM:SS AM/PM"
 * @example
 * ```typescript
 * formatDate('es-ES', new Date('2023-12-25'))
 * // Devuelve "25/12/2023, 12:00:00 AM"
 * ```
 */

export const formatDate = (locale: string, date: Date) => {
  return new Date(date).toLocaleString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};
