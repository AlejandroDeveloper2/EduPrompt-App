import { NavigationRoute, ParamListBase } from "@react-navigation/native";

export enum AppNavigationRoutes {
  index = "index",
  tags_screen = "tags_screen",
  prompts_screen = "prompts_screen",
  generate_screen = "generate_screen",
  settings_screen = "settings_screen",
  resources_screen = "resources_screen",
  marketplace_screen = "marketplace_screen",
  files_screen = "files_screen",
  notifications_screen = "notifications_screen",
}

export const getMainNavigationRoutes = (
  routes: NavigationRoute<ParamListBase, string>[]
): {
  firstItemsSlice: NavigationRoute<ParamListBase, string>[];
  centerItemsSlice: NavigationRoute<ParamListBase, string>[];
  secondItemsSlice: NavigationRoute<ParamListBase, string>[];
} => {
  const formatName = (name: string) => {
    return name.includes("/") ? name.split("/")[0] : name;
  };

  const indexRoute = routes.filter(
    (r) => r.name === AppNavigationRoutes.index
  )[0];
  const resourceRoute = routes.filter(
    (r) => r.name === AppNavigationRoutes.resources_screen
  )[0];

  const generationRoute = routes.filter(
    (r) => r.name === AppNavigationRoutes.generate_screen
  )[0];

  const filesRoute = routes.filter(
    (r) => formatName(r.name) === AppNavigationRoutes.files_screen
  )[0];
  const promptRoute = routes.filter(
    (r) => r.name === AppNavigationRoutes.prompts_screen
  )[0];

  return {
    firstItemsSlice: [indexRoute, resourceRoute],
    centerItemsSlice: [generationRoute],
    secondItemsSlice: [filesRoute, promptRoute],
  };
};
