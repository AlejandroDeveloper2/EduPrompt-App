import { Tabs } from "expo-router";
import { Drawer } from "expo-router/drawer";

import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { Header, NavigationDrawer, NavigationTab } from "@/components/organims";

export default function TabLayout() {
  const size = useScreenDimensionsStore();

  if (size === "laptop")
    return (
      <Drawer
        screenOptions={{
          headerShown: true,
          header: () => <Header />,
          drawerType: "permanent",
          drawerStyle: {
            width: "auto",
          },
        }}
        drawerContent={(props) => <NavigationDrawer actions={[]} {...props} />}
      />
    );

  return (
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
  );
}
