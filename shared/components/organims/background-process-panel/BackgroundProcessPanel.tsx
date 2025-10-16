import { View } from "react-native";

import { AppColors } from "../../../styles";

import { useBackgroundTasksStore } from "../../../hooks/store";

import { Typography } from "../../atoms";
import { Empty } from "../../molecules";
import SubprocessList from "../subprocess-list/SubprocessList";

import { BackgroundProcessPanelStyle } from "./BackgroundProcessPanel.style";

const BackgroundProcessPanel = () => {
  const { tasks } = useBackgroundTasksStore();

  return (
    <View style={BackgroundProcessPanelStyle.Container}>
      <View style={BackgroundProcessPanelStyle.Header}>
        <Typography
          text="Procesos activos"
          weight="medium"
          type="button"
          textAlign="left"
          color={AppColors.neutral[1000]}
          width="auto"
          icon="settings-outline"
        />
        <Typography
          text="Hoy, 20/05/2025"
          weight="regular"
          type="caption"
          textAlign="left"
          color={AppColors.neutral[600]}
          width="auto"
        />
      </View>

      {tasks.length === 0 ? (
        <Empty
          message="No hay procesos activos ahora!"
          icon="settings-outline"
        />
      ) : (
        <SubprocessList subprocesses={tasks} />
      )}
    </View>
  );
};

export default BackgroundProcessPanel;
