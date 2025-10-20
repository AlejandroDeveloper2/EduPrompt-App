export const checkIsNewNotification = (creationDate: Date) => {
  const createdAt = new Date(creationDate);
  const now = new Date();

  const diffMinutes = Math.abs(
    (now.getTime() - createdAt.getTime()) / (1000 * 60)
  );

  return {
    isNew: diffMinutes < 20,
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
