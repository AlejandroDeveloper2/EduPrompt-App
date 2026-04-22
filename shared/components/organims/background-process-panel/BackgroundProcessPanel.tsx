import { View } from "react-native";

import { AppColors } from "../../../styles";

import { useTranslations } from "@/shared/hooks/core";
import { useBackgroundTasksStore } from "../../../hooks/store";

import { Typography } from "../../atoms";
import { Empty } from "../../molecules";
import SubprocessList from "../subprocess-list/SubprocessList";

import { styles } from "./BackgroundProcessPanel.style";

const BackgroundProcessPanel = () => {
  const { tasks } = useBackgroundTasksStore();
  const { t } = useTranslations();

  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <Typography
          text={t(
            "dashboard_translations.dashboard_panel_labels.background_processes_labels.title",
          )}
          weight="medium"
          type="button"
          textAlign="left"
          color={AppColors.neutral[1000]}
          width="auto"
          icon="settings-outline"
        />
        <Typography
          text={`${t(
            "dashboard_translations.dashboard_panel_labels.background_processes_labels.day_span",
          )}, ${new Date().toLocaleDateString()} `}
          weight="regular"
          type="caption"
          textAlign="left"
          color={AppColors.neutral[600]}
          width="auto"
        />
      </View>

      {tasks.length === 0 ? (
        <Empty
          message={t(
            "dashboard_translations.dashboard_panel_labels.background_processes_labels.no_active_processes_msg",
          )}
          icon="settings-outline"
        />
      ) : (
        <SubprocessList subprocesses={tasks} />
      )}
    </View>
  );
};

export default BackgroundProcessPanel;
