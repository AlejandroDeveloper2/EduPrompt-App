import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { NavigationRoute, ParamListBase } from "@react-navigation/native";

import { NAV_ITEMS } from "../../constants";

import { getActiveDrawerItem, getActiveNavItem } from "../../helpers";

import NavItem from "../../components/molecules/nav-item/NavItem";

export const renderDrawerItem = (
  language: "es",
  index: number,
  navOption: NavigationRoute<ParamListBase, string>,
  { descriptors, state, navigation }: DrawerContentComponentProps
) => {
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

export const renderNavItem = (
  language: "es",
  index: number,
  navOption: NavigationRoute<ParamListBase, string>,
  { descriptors, state, navigation }: BottomTabBarProps
) => {
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
