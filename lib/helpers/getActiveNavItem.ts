import {
  DrawerNavigationState,
  NavigationRoute,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";

export const getActiveNavItem = (
  navOption: NavigationRoute<ParamListBase, string>,
  state: TabNavigationState<ParamListBase>
) => {
  const isActive =
    state.index ===
    state.routes.findIndex((route) => route.key === navOption.key);

  return isActive;
};

export const getActiveDrawerItem = (
  navOption: NavigationRoute<ParamListBase, string>,
  state: DrawerNavigationState<ParamListBase>
) => {
  const isActive =
    state.index ===
    state.routes.findIndex((route) => route.key === navOption.key);

  return isActive;
};
