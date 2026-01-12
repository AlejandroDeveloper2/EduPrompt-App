import { View } from "react-native";

import { BACKGROUND_PROCESS_NAMES } from "@/features/educational-resources/constants";

import { ResourcesFiltersProvider } from "@/features/educational-resources/context";

import { useOfflineResourcesStore } from "@/features/educational-resources/hooks/store";

import { ProcessProgress } from "@/shared/components/organims";
import { PreviewResourceList } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const MyResourcesTemplate = () => {
  const { isDownloading } = useOfflineResourcesStore();

  return (
    <ResourcesFiltersProvider>
      <View style={GlobalStyles.RootContainer}>
        {isDownloading ? (
          <ProcessProgress
            processName={BACKGROUND_PROCESS_NAMES.downloadProcess}
            defaultDuration={6000}
            info={{
              title: "Descargando recursos...",
              description:
                "Se están descargando tus recursos seleccionados, esto podria tomar unos segundos..",
              icon: "download-outline",
            }}
          />
        ) : (
          <PreviewResourceList />
        )}
      </View>
    </ResourcesFiltersProvider>
  );
};

export default MyResourcesTemplate;
