import { Tabs } from "expo-router";
import { Drawer } from "expo-router/drawer";

import { AppColors } from "@/shared/styles";

/** Stores */
import { useScreenDimensionsStore } from "@/shared/hooks/store";

/** Contextos */
import { useSelectionModeContext } from "@/shared/hooks/context";

/** Queries */
import { useUserProfileQuery } from "@/features/settings/hooks/queries";

/** Listeners */
import { useDashboardEventListeners } from "@/features/dashboard/hooks/listeners";

/** Jobs */
import {
  useBlockBackWhenSelection,
  useDailyRewardJob,
} from "@/shared/hooks/core";

import { CustomStatusBar } from "@/shared/components/atoms";
import {
  Header,
  NavigationDrawer,
  NavigationTab,
} from "@/shared/components/organims";

export default function TabLayout() {
  const size = useScreenDimensionsStore();

  const { actions } = useSelectionModeContext();

  /** Cargar perifl de usuario */
  useUserProfileQuery();

  /** Listener para escuchar los cambios en las estadisticas del panel de control */
  useDashboardEventListeners();

  /** Job de recompenza diaria al ingresar al panel principal de la app */
  useDailyRewardJob();

  /** Detectar el back swipe del usuario */
  useBlockBackWhenSelection();

  if (size === "laptop")
    return (
      <>
        <CustomStatusBar backgroundColor={AppColors.basic.white} />
        <Drawer
          screenOptions={{
            headerShown: true,
            header: () => <Header />,
            drawerType: "permanent",

            drawerStyle: {
              width: "auto",
            },
          }}
          drawerContent={(props) => (
            <NavigationDrawer actions={actions} {...props} />
          )}
        />
      </>
    );

  return (
    <>
      <CustomStatusBar backgroundColor={AppColors.basic.white} />
      <Tabs
        screenOptions={{
          headerShown: true,
          header: () => <Header />,
          tabBarStyle: {
            backgroundColor: "transparent",
            position: "absolute",
            height: 0,
          },
        }}
        tabBar={(props) => <NavigationTab actions={actions} {...props} />}
      />
    </>
  );
}
