import { View } from "react-native";

import { AppColors } from "../../../styles";

import { useTranslations } from "@/shared/hooks/core";
import { useBackgroundTasksStore } from "../../../hooks/store";

import { Typography } from "../../atoms";
import { Empty } from "../../molecules";
import SubprocessList from "../subprocess-list/SubprocessList";

import { BackgroundProcessPanelStyle } from "./BackgroundProcessPanel.style";

const BackgroundProcessPanel = () => {
  const { tasks } = useBackgroundTasksStore();

  const { t } = useTranslations();

  return (
    <View style={BackgroundProcessPanelStyle.Container}>
      <View style={BackgroundProcessPanelStyle.Header}>
        <Typography
          text={t(
            "dashboard-translations.dashboard-panel-labels.background-processes-labels.title"
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
            "dashboard-translations.dashboard-panel-labels.background-processes-labels.day-span"
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
            "dashboard-translations.dashboard-panel-labels.background-processes-labels.no-active-processes-msg"
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
