import { Pressable, View } from "react-native";

import { Tab } from "@/core/types";

import { useResponsive } from "@/shared/hooks/core";

import { AppColors } from "../../../styles";

import { Typography } from "../../atoms";

import { dynamicStyles } from "./Tabulator.style";

interface TabulatorProps {
  tabs: readonly Tab[];
  activeTab: Tab;
  onSwitchTab: (tab: Tab) => void;
}

const Tabulator = ({ tabs, activeTab, onSwitchTab }: TabulatorProps) => {
  const size = useResponsive();

  const styles = dynamicStyles(size);

  return (
    <View style={styles.TabulatorContainer}>
      {tabs.map((tab) => (
        <Pressable
          key={tab.tabId}
          onPress={() => onSwitchTab(tab)}
          style={[
            {
              backgroundColor:
                tab.tabId === activeTab.tabId
                  ? AppColors.primary[400]
                  : AppColors.basic.white,
            },
            styles.TabPressable,
          ]}
        >
          <Typography
            text={tab.label}
            weight="regular"
            type="paragraph"
            textAlign="center"
            color={
              tab.tabId === activeTab.tabId
                ? AppColors.basic.white
                : AppColors.neutral[1000]
            }
            width="100%"
          />
        </Pressable>
      ))}
    </View>
  );
};

export default Tabulator;
