import { Tabs } from "expo-router";
import { Drawer } from "expo-router/drawer";

import { AppColors } from "@/shared/styles";

import { useDashboardEventListeners } from "@/features/dashboard/hooks/core";
import {
  useCleanNotificationsJob,
  useNotificationCheckerJob,
  useUserNotificationsEventListener,
} from "@/features/notifications/hooks/core";
import { useUserEventsListener } from "@/features/settings/hooks/core";
import { useUserProfileQuery } from "@/features/settings/hooks/queries";
import { useDailyRewardJob } from "@/shared/hooks/core";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { CustomStatusBar } from "@/shared/components/atoms";
import {
  Header,
  NavigationDrawer,
  NavigationTab,
} from "@/shared/components/organims";

export default function TabLayout() {
  const size = useScreenDimensionsStore();

  /** Cargar perifl de usuario */
  useUserProfileQuery();

  /** Job de recompenza diaria al ingresar al panel principal de la app */
  useDailyRewardJob();

  /** Job para escuchar eventos del modulo de notificaciones */
  useUserNotificationsEventListener();

  /** Job para escuchar eventos del modulo de perfil de usuario */
  useUserEventsListener();

  /** Job para limpiar notificaciones */
  useCleanNotificationsJob();

  /** Job para revisar si la notificaciones son nuevas o no */
  useNotificationCheckerJob();

  /** Listener para escuchar los cambios en las estadisticas del panel de control */
  useDashboardEventListeners();

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
            <NavigationDrawer actions={[]} {...props} />
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
        tabBar={(props) => <NavigationTab actions={[]} {...props} />}
      />
    </>
  );
}
