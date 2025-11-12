import { ScrollView, View } from "react-native";

import { useDashboardInit } from "../../../hooks/core";

import { ScreenSection } from "@/shared/components/atoms";
import { BackgroundProcessPanel } from "@/shared/components/organims";
import { DashboardIndicatorPanel } from "../../organims";

import { Spacing } from "@/shared/styles";
import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const DashboardTemplate = () => {
  useDashboardInit();

  return (
    <View style={GlobalStyles.RootContainer}>
      <ScrollView
        style={GlobalStyles.PageDimensions}
        contentContainerStyle={GlobalStyles.PageContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: Spacing.spacing_xl }}>
          <ScreenSection
            description={
              "Aquí puedes ver cómo has usado Edu Prompt: cuántos recursos has generado, cuántos tokens has usado y cómo vas con tus actividades. Todo lo que necesitas para tener el control, en un solo lugar."
            }
            title={"Panel de control"}
            icon="grid-outline"
          />
          <DashboardIndicatorPanel />
          <BackgroundProcessPanel />
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardTemplate;
