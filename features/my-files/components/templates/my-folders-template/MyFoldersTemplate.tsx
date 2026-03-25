import { View } from "react-native";

import { BACKGROUND_PROCESS_NAMES } from "@/features/my-files/constants";

import { useFoldersStore } from "@/features/my-files/hooks/store";
import { useTranslations } from "@/shared/hooks/core";

import { ProcessProgress } from "@/shared/components/organims";
import { FolderList } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const MyFoldersTemplate = () => {
  const { isSharing } = useFoldersStore();

  const { t } = useTranslations();

  return (
    <View style={GlobalStyles.RootContainer}>
      {isSharing ? (
        <ProcessProgress
          processName={BACKGROUND_PROCESS_NAMES.sharingFoldersProcess}
          defaultDuration={6000}
          info={{
            title: t(
              "my_files_translations.processes_labels.share_folders_process.title"
            ),
            description: t(
              "my_files_translations.processes_labels.share_folders_process.description"
            ),
            icon: "folder-outline",
          }}
        />
      ) : (
        <FolderList />
      )}
    </View>
  );
};

export default MyFoldersTemplate;
