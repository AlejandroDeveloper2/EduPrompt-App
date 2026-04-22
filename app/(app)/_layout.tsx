import { Stack } from "expo-router";
import { Dimensions } from "react-native";

/** Context */
import { ResourcesFiltersProvider } from "@/features/educational-resources/context";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

export const unstable_settings = {
  anchor: "(tabs)",
};

const { width } = Dimensions.get("window");

const isTablet = width >= 768;

// Opciones reutilizables por cada sheet
const sheetOptions = isTablet
  ? {
      // En tablet: modal centrado, se ve como card flotante
      presentation: "modal" as const,
      animation: "slide_from_bottom" as const,
      contentStyle: {
        maxWidth: 560,
        alignSelf: "center" as const,
        width: "100%" as const,
        borderRadius: 16,
        overflow: "hidden" as const,
      },
    }
  : {
      // En phone: bottom sheet nativo
      presentation: "formSheet" as const,
      animation: "slide_from_bottom" as const,
      sheetGrabberVisible: true,
      sheetAllowedDetents: [0.5, 0.95],
    };

export default function AppLayout() {
  return (
    <ResourcesFiltersProvider>
      <Stack screenOptions={{ headerShown: false, animation: "none" }}>
        {/* El tab navigator como pantalla base */}
        <Stack.Screen name="(tabs)" />

        {/* Sheets declarados aquí, fuera del tab navigator */}
        <Stack.Screen
          name="set_language_sheet"
          options={{ ...sheetOptions, contentStyle: GlobalStyles.SheetContent }}
        />
        <Stack.Screen
          name="set_clean_frecuency_sheet"
          options={{
            ...sheetOptions,
            contentStyle: GlobalStyles.SheetContent,
          }}
        />
        <Stack.Screen
          name="update_resource_sheet"
          options={{
            ...sheetOptions,
            contentStyle: GlobalStyles.SheetContent,
          }}
        />
        <Stack.Screen
          name="resource_tags_sheet"
          options={{
            ...sheetOptions,
            contentStyle: GlobalStyles.SheetContent,
          }}
        />
        <Stack.Screen
          name="resources_sharing_sheet"
          options={{
            ...sheetOptions,
            contentStyle: GlobalStyles.SheetContent,
          }}
        />
      </Stack>
    </ResourcesFiltersProvider>
  );
}
