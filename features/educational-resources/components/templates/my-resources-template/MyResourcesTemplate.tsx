import { View } from "react-native";

import { BACKGROUND_PROCESS_NAMES } from "@/features/educational-resources/constants";

import { ResourcesFiltersProvider } from "@/features/educational-resources/context";

import { useOfflineResourcesStore } from "@/features/educational-resources/hooks/store";
import { useTranslations } from "@/shared/hooks/core";

import { ProcessProgress } from "@/shared/components/organims";
import { PreviewResourceList } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const MyResourcesTemplate = () => {
  const { isDownloading } = useOfflineResourcesStore();

  const { t } = useTranslations();

  return (
    <ResourcesFiltersProvider>
      <View style={GlobalStyles.RootContainer}>
        {isDownloading ? (
          <ProcessProgress
            processName={BACKGROUND_PROCESS_NAMES.downloadProcess}
            defaultDuration={6000}
            info={{
              title: t(
                "resources-translations.processes-labels.download-resources-process.title"
              ),
              description: t(
                "resources-translations.processes-labels.download-resources-process.description"
              ),
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
