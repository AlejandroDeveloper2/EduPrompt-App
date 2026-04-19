import { useMemo } from "react";
import { View } from "react-native";

import { Process } from "@/core/types";

import { useScreenDimensionsStore } from "../../../hooks/store";

import { Subprocess } from "../../molecules";

import { dynamicStyles } from "./SubprocessList.style";

interface SubprocessListProps {
  subprocesses: Process[];
}

const SubprocessList = ({ subprocesses }: SubprocessListProps) => {
  const size = useScreenDimensionsStore();
  const styles = useMemo(() => dynamicStyles(size), [size]);

  return (
    <View style={styles.List}>
      {subprocesses.map((subProcess) => (
        <Subprocess
          key={subProcess.processId}
          processName={subProcess.processName}
          processType={subProcess.type}
          progressConfig={subProcess.progressConfig}
          tasksDone={subProcess.tasksDone}
        />
      ))}
    </View>
  );
};

export default SubprocessList;
