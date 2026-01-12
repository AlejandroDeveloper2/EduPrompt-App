import { View } from "react-native";

import { BACKGROUND_PROCESS_NAMES } from "@/features/my-files/constants";

import { useFoldersStore } from "@/features/my-files/hooks/store";

import { ProcessProgress } from "@/shared/components/organims";
import { FolderList } from "../../organims";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const MyFoldersTemplate = () => {
  const { isSharing } = useFoldersStore();

  return (
    <View style={GlobalStyles.RootContainer}>
      {isSharing ? (
        <ProcessProgress
          processName={BACKGROUND_PROCESS_NAMES.sharingFoldersProcess}
          defaultDuration={6000}
          info={{
            title: "Preparando para compartir",
            description:
              "Se estan preparando las carpetas a compartir, el proceso puede tomar unos segundos.",
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
