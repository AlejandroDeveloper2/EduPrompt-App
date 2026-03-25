import { View } from "react-native";

import { BACKGROUND_PROCESS_NAMES } from "@/features/my-files/constants";

import { useFilesStore } from "@/features/my-files/hooks/store";
import { useTranslations } from "@/shared/hooks/core";

import { ProcessProgress } from "@/shared/components/organims";
import { DownloadedFileList } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const MyFilesTemplate = () => {
  const { isSharing } = useFilesStore();

  const { t } = useTranslations();

  return (
    <View style={GlobalStyles.RootContainer}>
      {isSharing ? (
        <ProcessProgress
          processName={BACKGROUND_PROCESS_NAMES.sharingFilesProcess}
          defaultDuration={6000}
          info={{
            title: t(
              "my_files_translations.processes_labels.share_files_process.title"
            ),
            description: t(
              "my_files_translations.processes_labels.share_files_process.description"
            ),
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
