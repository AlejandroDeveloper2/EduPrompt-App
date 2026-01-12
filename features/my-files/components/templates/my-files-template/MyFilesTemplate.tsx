import { View } from "react-native";

import { BACKGROUND_PROCESS_NAMES } from "@/features/my-files/constants";

import { useFilesStore } from "@/features/my-files/hooks/store";

import { ProcessProgress } from "@/shared/components/organims";
import { DownloadedFileList } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const MyFilesTemplate = () => {
  const { isSharing } = useFilesStore();

  return (
    <View style={GlobalStyles.RootContainer}>
      {isSharing ? (
        <ProcessProgress
          processName={BACKGROUND_PROCESS_NAMES.sharingFilesProcess}
          defaultDuration={6000}
          info={{
            title: "Preparando para compartir",
            description:
              "Se estan preparando los archivos a compartir, el proceso puede tomar unos segundos.",
            icon: "document-outline",
          }}
        />
      ) : (
        <DownloadedFileList />
      )}
    </View>
  );
};

export default MyFilesTemplate;
