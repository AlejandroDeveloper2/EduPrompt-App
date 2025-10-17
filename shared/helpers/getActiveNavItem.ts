import {
  DrawerNavigationState,
  NavigationRoute,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";

/**
 * Determina si una opción de navegación dada corresponde a la pestaña actualmente activa.
 *
 * Compara la clave de la opción de navegación proporcionada con la clave de la ruta en
 * el índice actual del estado de navegación por pestañas. Devuelve `true` cuando coinciden, de lo contrario `false`.
 *
 * @param navOption - La opción de ruta de navegación a probar. Se espera que sea un NavigationRoute<ParamListBase, string>.
 * @param state - El estado de navegación por pestañas actual. Se espera que sea un TabNavigationState<ParamListBase>.
 * @returns `true` si la `navOption` proporcionada es la pestaña activa en `state`; de lo contrario `false`.
 *
 * @example
 * // Uso dentro de un renderizador de la barra de pestañas:
 * const active = getActiveNavItem(navOption, navigationState);
 *
 * @remarks
 * Esta función depende de que las claves de las rutas sean únicas dentro del arreglo `routes` del estado.
 */
export const getActiveNavItem = (
  navOption: NavigationRoute<ParamListBase, string>,
  state: TabNavigationState<ParamListBase>
) => {
  const isActive =
    state.index ===
    state.routes.findIndex((route) => route.key === navOption.key);

  return isActive;
};

/**
 * Determina si una opción de navegación está actualmente activa en el estado de navegación del drawer
 * @param navOption - La opción de ruta de navegación a verificar
 * @param state - El estado actual de navegación del drawer
 * @returns booleano que indica si la opción de navegación está activa
 */
export const getActiveDrawerItem = (
  navOption: NavigationRoute<ParamListBase, string>,
  state: DrawerNavigationState<ParamListBase>
) => {
  const isActive =
    state.index ===
    state.routes.findIndex((route) => route.key === navOption.key);

  return isActive;
};
