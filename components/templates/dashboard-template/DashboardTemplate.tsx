import { ScrollView, View } from "react-native";

import { useLoadIndicators } from "@/lib/hooks/core";
import { useLogout } from "@/lib/hooks/mutations/auth";

import { ScreenSection } from "@/components/atoms";
import { Button } from "@/components/molecules";
import {
  BackgroundProcessPanel,
  DashboardIndicatorPanel,
} from "@/components/organims";

import { Spacing } from "@/styles";
import { GlobalStyles } from "@/styles/GlobalStyles.style";

const DashboardTemplate = () => {
  useLoadIndicators();
  const { mutate } = useLogout();

  return (
    <View style={GlobalStyles.RootContainer}>
      <ScrollView
        contentContainerStyle={GlobalStyles.PageContent}
        showsVerticalScrollIndicator={false}
      >
        <Button
          icon="power-outline"
          variant="neutral"
          width="auto"
          onPress={mutate}
          label="Cerrar sesión"
        />
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
