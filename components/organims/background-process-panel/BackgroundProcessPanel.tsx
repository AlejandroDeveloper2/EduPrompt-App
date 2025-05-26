import { View } from "react-native";

import { Process } from "@/lib/types/data-types";

import { AppColors } from "@/styles";

import { Typography } from "@/components/atoms";
import { Empty } from "@/components/molecules";
import SubprocessList from "../subprocess-list/SubprocessList";

import { BackgroundProcessPanelStyle } from "./BackgroundProcessPanel.style";

const subsprocesses: Process[] = [
  {
    processId: "process-1",
    type: "generation",
    processName: "Guía de planificación",
    progressConfig: {
      mode: "duration-timer",
      limit: 4000,
    },
  },
  {
    processId: "process-2",
    type: "generation",
    processName: "Tareas para el estudiante",
    progressConfig: {
      mode: "duration-timer",
      limit: 6000,
    },
  },
  {
    processId: "process-3",
    type: "downloading",
    processName: "Descargando recursos",
    progressConfig: {
      mode: "progress-counter",
      limit: 20,
    },
    tasksDone: 7,
  },
];

const BackgroundProcessPanel = () => {
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
      {subsprocesses.length === 0 ? (
        <Empty
          message="No hay procesos activos ahora!"
          icon="settings-outline"
        />
      ) : (
        <SubprocessList subprocesses={subsprocesses} />
      )}
    </View>
  );
};

export default BackgroundProcessPanel;
