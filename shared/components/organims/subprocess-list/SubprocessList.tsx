import { View } from "react-native";

import { Process } from "@/core/types";

import { useResponsive } from "@/shared/hooks/core";

import { Subprocess } from "../../molecules";

import { dynamicStyles } from "./SubprocessList.style";

interface SubprocessListProps {
  subprocesses: Process[];
}

const SubprocessList = ({ subprocesses }: SubprocessListProps) => {
  const size = useResponsive();

  const styles = dynamicStyles(size);

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
