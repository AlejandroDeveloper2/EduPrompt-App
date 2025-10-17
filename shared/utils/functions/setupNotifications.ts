import { setNotificationHandler } from "expo-notifications";

/**
 * Configura el comportamiento global de las notificaciones dentro de la aplicación.
 *
 * Esta función establece el manejador de notificaciones mediante `setNotificationHandler`,
 * definiendo cómo deben mostrarse las notificaciones cuando la app las recibe
 * (por ejemplo, si deben mostrarse en banner, lista, reproducir sonido o establecer un badge).
 *
 * @returns {void} No retorna ningún valor.
 *
 * @example
 * // Llamar esta función al inicializar la app
 * import { setupNotifications } from "@/core/notifications";
 *
 * setupNotifications();
 *
 * // Las notificaciones se mostrarán en banner y lista,
 * // sin reproducir sonido ni modificar el badge del ícono.
 */
export const setupNotifications = (): void => {
  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
};
