import { Tabs } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useEffect } from "react";

import { AppColors } from "@/shared/styles";

import { jobScheduler } from "@/core/jobs/JobScheduler";
import { registerJobs } from "@/core/jobs/registerJobs";

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
import { useTagEventListeners } from "@/features/tags/hooks/listeners";

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
  const { isFetched } = useUserProfileQuery();

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

  /** Listener para escuchar eventos del módulo de Etiquetas */
  useTagEventListeners();

  /** Detectar el back swipe del usuario */
  useBlockBackWhenSelection();

  /** Registramos el Job schedule */
  useEffect(() => {
    registerJobs();
    jobScheduler.init();

    if (!isFetched) return;

    const timer = setTimeout(() => {
      jobScheduler.start();
    }, 100);

    return () => {
      clearTimeout(timer);
      jobScheduler.cleanup();
    };
  }, [isFetched]);

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
