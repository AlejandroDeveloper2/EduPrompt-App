import type { ToastConfig } from "./types";

/**
 * Referencia interna a la función que maneja la apertura de una notificación toast.
 *
 * Se espera que esta función acepte un objeto `ToastConfig` como parámetro,
 * el cual contiene la configuración del toast que se mostrará.
 *
 * Si no se ha establecido un manejador, el valor será `null`.
 */
let _onOpen: ((config: ToastConfig) => void) | null = null;

/**
 * Registra un callback que se invocará para mostrar notificaciones tipo toast.
 *
 * La función proporcionada se almacena como el manejador actual de "mostrar toast" y
 * será llamada más adelante con un ToastConfig cuando sea necesario mostrar un toast.
 * Llamar a esta función reemplaza cualquier manejador registrado anteriormente.
 *
 * @param fn - El callback a registrar. Será invocado con un ToastConfig que describe
 *             el contenido y las opciones del toast.
 * @returns void
 *
 * @example
 * registerShowToast(config => {
 *   // Usa tu capa de UI para mostrar el toast
 *   toastService.show(config);
 * });
 */
export const registerShowToast = (fn: (config: ToastConfig) => void) => {
  _onOpen = fn;
};

/**
 * Muestra una notificación toast con la configuración proporcionada
 * @param {ToastConfig} config - Objeto de configuración para el toast
 * @throws {Warning} Advertencia en consola si se llama antes de montar ToastProvider
 */
export const showToast = (config: ToastConfig) => {
  if (_onOpen) {
    _onOpen(config);
  } else {
    console.warn("⚠️ showToast was called before ToastProvider was mounted.");
  }
};
