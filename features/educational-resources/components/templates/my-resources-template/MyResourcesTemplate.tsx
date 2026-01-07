import { useMemo } from "react";
import { View } from "react-native";

import { BACKGROUND_PROCESS_NAMES } from "@/features/educational-resources/constants";

import { ResourcesFiltersProvider } from "@/features/educational-resources/context";

import { useOfflineResourcesStore } from "@/features/educational-resources/hooks/store";

import { calcAvarageProcessDuration } from "@/shared/utils";

import { Loader } from "@/shared/components/organims";
import { PreviewResourceList } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const MyResourcesTemplate = () => {
  const { isDownloading } = useOfflineResourcesStore();

  const processDuration = useMemo(() => {
    const processName = BACKGROUND_PROCESS_NAMES.downloadProcess;
    return calcAvarageProcessDuration(processName);
  }, []);

  return (
    <ResourcesFiltersProvider>
      <View style={GlobalStyles.RootContainer}>
        {isDownloading ? (
          <Loader
            title="Descargando recursos..."
            description="Se están descargando tus recursos seleccionados, esto podria tomar unos segundos.."
            icon="download-outline"
            progressConfig={{
              mode: "duration-timer",
              limit: processDuration ?? 6000,
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
