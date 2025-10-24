import { Tabs } from "expo-router";
import { Drawer } from "expo-router/drawer";

import { AppColors } from "@/shared/styles";

import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { CustomStatusBar } from "@/shared/components/atoms";
import {
  Header,
  NavigationDrawer,
  NavigationTab,
} from "@/shared/components/organims";

export default function TabLayout() {
  const size = useScreenDimensionsStore();

  // /** Job de recompenza diaria al ingresar al panel principal de la app */
  // useDailyRewardJob();

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
