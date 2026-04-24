import { useMemo } from "react";
import { Image, View } from "react-native";

import { useResourceGenerationStore } from "@/features/generations/store";
import { useResponsive, useTranslations } from "@/shared/hooks/core";

import { setGenerationProcessName } from "@/features/generations/helpers";
import { calcAvarageProcessDuration } from "@/shared/utils";

import { Button } from "@/shared/components/molecules";
import { Loader } from "@/shared/components/organims";

import GeneratingImage from "@/assets/images/generating-image.png";

const Generating = () => {
  const size = useResponsive();
  const { clearSelectedGeneration, currentIaGeneration } =
    useResourceGenerationStore((state) => ({
      clearSelectedGeneration: state.clearSelectedGeneration,
      currentIaGeneration: state.currentIaGeneration,
    }));
  const { t } = useTranslations();
  const processDuration = useMemo(() => {
    if (!currentIaGeneration) return null;
    const { data } = currentIaGeneration;
    const processName = setGenerationProcessName(data);
    return calcAvarageProcessDuration(processName);
  }, [currentIaGeneration]);

  return (
    <View style={{ alignItems: "flex-end" }}>
      <Button
        icon="chevron-back-outline"
        label={t(
          "generations_translations.generating_indicator_labels.btn_back",
        )}
        variant="neutral"
        width="auto"
        onPress={clearSelectedGeneration}
      />
      <Image
        source={GeneratingImage}
        style={{
          transform: [{ scale: size === "mobile" ? 0.8 : 1 }],
          margin: "auto",
        }}
      />
      <Loader
        title={t("generations_translations.generating_indicator_labels.title")}
        description={t(
          "generations_translations.generating_indicator_labels.description",
        )}
        icon="settings-outline"
        progressConfig={{
          mode: "duration-timer",
          limit: processDuration ?? 10000,
        }}
      />
    </View>
  );
};

export default Generating;
