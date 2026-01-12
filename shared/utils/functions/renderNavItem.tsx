import { JSX } from "react";

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { NavigationRoute, ParamListBase } from "@react-navigation/native";

import { NAV_ITEMS } from "../../constants";

import { getActiveDrawerItem, getActiveNavItem } from "../../helpers";

import NavItem from "../../components/molecules/nav-item/NavItem";

/**
 * Renderiza un elemento del menú lateral (Drawer) en función del idioma, la opción de navegación
 * y el estado actual de la navegación.
 *
 * Esta función toma la configuración de la ruta, determina si el elemento está activo
 * y devuelve un componente `NavItem` con su ícono, etiqueta y acción de navegación.
 *
 * @param {"es"} language - Idioma actual de la interfaz. Actualmente solo soporta `"es"`.
 * @param {number} index - Índice del elemento dentro del arreglo `NAV_ITEMS`.
 * @param {NavigationRoute<ParamListBase, string>} navOption - Objeto de ruta de navegación.
 * @param {DrawerContentComponentProps} props - Propiedades del componente Drawer proporcionadas por React Navigation,
 * incluyendo `descriptors`, `state` y `navigation`.
 *
 * @returns {JSX.Element} Un componente `NavItem` que representa un elemento del Drawer.
 *
 * @example
 * renderDrawerItem("es", 0, route, {
 *   descriptors,
 *   state,
 *   navigation
 * });
 */
export const renderDrawerItem = (
  language: "es",
  index: number,
  navOption: NavigationRoute<ParamListBase, string>,
  { descriptors, state, navigation }: DrawerContentComponentProps
): JSX.Element => {
  const isActive = getActiveDrawerItem(navOption, state);

  const { options } = descriptors[navOption.key];
  options.title = NAV_ITEMS[language][index].label;

  return (
    <NavItem
      key={NAV_ITEMS[language][index].navItemId}
      active={isActive}
      icon={NAV_ITEMS[language][index].icon}
      label={options.title}
      onPress={() => navigation.navigate(navOption.name)}
    />
  );
};

/**
 * Renderiza un elemento de la barra de navegación inferior (Bottom Tab)
 * según el idioma, el índice y la configuración de navegación actual.
 *
 * Similar a `renderDrawerItem`, esta función genera dinámicamente un componente `NavItem`
 * con su ícono, etiqueta traducida y acción de navegación correspondiente.
 *
 * @param {"es"} language - Idioma actual de la interfaz. Actualmente solo soporta `"es"`.
 * @param {number} index - Índice del elemento dentro del arreglo `NAV_ITEMS`.
 * @param {NavigationRoute<ParamListBase, string>} navOption - Objeto de ruta de navegación.
 * @param {BottomTabBarProps} props - Propiedades del componente Bottom Tab proporcionadas por React Navigation,
 * incluyendo `descriptors`, `state` y `navigation`.
 *
 * @returns {JSX.Element} Un componente `NavItem` que representa un ítem de la barra de navegación inferior.
 *
 * @example
 * renderNavItem("es", 1, route, {
 *   descriptors,
 *   state,
 *   navigation
 * });
 */
export const renderNavItem = (
  language: "es",
  index: number,
  navOption: NavigationRoute<ParamListBase, string>,
  { descriptors, state, navigation }: BottomTabBarProps
): JSX.Element => {
  const isActive = getActiveNavItem(navOption, state);

  const { options } = descriptors[navOption.key];
  options.title = NAV_ITEMS[language][index].label;

  return (
    <NavItem
      key={NAV_ITEMS[language][index].navItemId}
      active={isActive}
      icon={NAV_ITEMS[language][index].icon}
      label={options.title}
      onPress={() => navigation.navigate(navOption.name)}
    />
  );
};
