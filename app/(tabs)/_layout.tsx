import { Tabs } from "expo-router";
import { Drawer } from "expo-router/drawer";

import { AppColors } from "@/shared/styles";

/** Stores */
import {
  useScreenDimensionsStore,
  useSelectionModeStore,
} from "@/shared/hooks/store";

/** Queries */
import { useUserProfileQuery } from "@/features/settings/hooks/queries";

/** Listeners */
import { useDashboardEventListeners } from "@/features/dashboard/hooks/listeners";
import { useUserNotificationsEventListener } from "@/features/notifications/hooks/listeners";
import { useUserEventsListener } from "@/features/settings/hooks/listeners";

/** Jobs */
import {
  useCleanNotificationsJob,
  useNotificationCheckerJob,
} from "@/features/notifications/hooks/core";
import { useBlockBackWhenSelection } from "@/shared/hooks/core";

import { CustomStatusBar } from "@/shared/components/atoms";
import {
  Header,
  NavigationDrawer,
  NavigationTab,
} from "@/shared/components/organims";

export default function TabLayout() {
  const size = useScreenDimensionsStore();

  const { actions } = useSelectionModeStore();

  /** Cargar perfil de usuario */
  useUserProfileQuery();

  /** Listener para escuchar eventos del modulo de notificaciones */
  useUserNotificationsEventListener();

  /** Job para limpiar notificaciones */
  useCleanNotificationsJob();

  /** Job para revisar si la notificaciones son nuevas o no */
  useNotificationCheckerJob();

  /** Listener para escuchar eventos del modulo de perfil de usuario */
  useUserEventsListener();

  /** Listener para escuchar los cambios en las estadisticas del panel de control */
  useDashboardEventListeners();

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
