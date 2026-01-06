import { useMemo } from "react";
import { Image, View } from "react-native";

import { useGenerationsStore } from "@/features/generations/hooks/store";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { setGenerationProcessName } from "@/features/generations/helpers";
import { calcAvarageProcessDuration } from "@/shared/utils";

import { Button } from "@/shared/components/molecules";
import { Loader } from "@/shared/components/organims";

import GeneratingImage from "@/assets/images/generating-image.png";

const Generating = () => {
  const size = useScreenDimensionsStore();
  const { clearSelectedGeneration, currentIaGeneration } =
    useGenerationsStore();

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
        label="Volver"
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
        title="Generando recurso..."
        description="Se esta generando el recurso educativo que ha solicitado. El proceso puede tomar unos segundos."
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
