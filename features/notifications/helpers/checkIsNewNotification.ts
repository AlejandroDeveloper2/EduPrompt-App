import { differenceInMinutes } from "date-fns";

export const checkIsNewNotification = (
  creationDate: string | Date | number
) => {
  // 1. Parse seguro
  const createdAt =
    creationDate instanceof Date
      ? creationDate
      : typeof creationDate === "number"
      ? new Date(creationDate)
      : new Date(String(creationDate));

  const now = new Date();

  // 2. Validar fecha
  if (Number.isNaN(createdAt.getTime())) {
    // Manejo explícito de error — evita resultados silenciosos
    throw new Error(`Invalid creationDate: ${creationDate}`);
  }

  const diffMinutes = differenceInMinutes(now, createdAt);

  return {
    isNew: diffMinutes < 20 && diffMinutes >= 0,
    formattedDate: createdAt.toLocaleString("es", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }),
  };
};
