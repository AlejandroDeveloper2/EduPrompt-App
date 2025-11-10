import { differenceInMinutes } from "date-fns";

import { formatDate } from "@/shared/helpers";

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
    formattedDate: formatDate("es", createdAt),
  };
};
