import { Pressable, View } from "react-native";

import { Tab } from "@/lib/types";

import { AppColors } from "@/styles";

import { useScreenDimensionsStore } from "@/lib/hooks/store";

import { Typography } from "@/components/atoms";

import { TabulatorStyle } from "./Tabulator.style";

interface TabulatorProps {
  tabs: readonly Tab[];
  activeTab: Tab;
  onSwitchTab: (tab: Tab) => void;
}

const Tabulator = ({ tabs, activeTab, onSwitchTab }: TabulatorProps) => {
  const size = useScreenDimensionsStore();

  const tabulatorStyle = TabulatorStyle(size);

  return (
    <View style={tabulatorStyle.TabulatorContainer}>
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
            tabulatorStyle.TabPressable,
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
