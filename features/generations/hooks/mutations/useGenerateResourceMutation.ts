import { useMutation } from "@tanstack/react-query";

import { AssistantResponse, GenerationData } from "../../types";

import { eventBus } from "@/core/events/EventBus";
import { showToast } from "@/shared/context";

import { useGenerationsStore } from "../store";

import { generateToastKey } from "@/shared/helpers";
import { formatGenerationData, getResourcePrice } from "../../helpers";
import { generateAndLoadPDF } from "../../utils";

import { postGenerateEducationalResource } from "../../services";

const useGenerateResourceMutation = () => {
  const { currentIaGeneration, updateIaGeneration, getIaGeneration } =
    useGenerationsStore();

  return useMutation({
    mutationFn: async (generationData: GenerationData) => {
      const formattedData = formatGenerationData(generationData);
      const iaResponse = await postGenerateEducationalResource(
        formattedData,
        generationData.resourceFormat.formatKey
      );
      return iaResponse;
    },
    onError: (error) => {
      console.log("error al generar: " + error);
      if (currentIaGeneration) {
        updateIaGeneration(
          currentIaGeneration.generationId,
          {},
          {},
          { isGenerating: false }
        );
        getIaGeneration(currentIaGeneration.generationId);
      }
    },
    onSuccess: async (data, variables) => {
      const { resourceFormat } = variables;
      let iaResponse: AssistantResponse = { ...data };

      if (
        resourceFormat.formatKey === "chart" ||
        resourceFormat.formatKey === "table"
      )
        iaResponse = {
          ...data,
          result: await generateAndLoadPDF(data.result),
        };

      if (!currentIaGeneration) return;

      updateIaGeneration(
        currentIaGeneration.generationId,
        {},
        {},
        { isGenerating: false, result: iaResponse }
      );
      getIaGeneration(currentIaGeneration.generationId);

      const amount = getResourcePrice(
        currentIaGeneration.data.resourceFormat.formatKey
      );

      eventBus.emit("userProfile.updateTokeUserCoins.requested", {
        amount,
        mode: "substract",
      });

      eventBus.emit(
        "dashboard.setLastGeneratedResource",
        currentIaGeneration.data.resourceType.other ??
          currentIaGeneration.data.resourceType.resourceTypeLabel
      );
      eventBus.emit("dashboard.addGeneratedResource", undefined);
      eventBus.emit("dashboard.addUsedTokens", amount);

      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "Recurso generado correctamente",
      });
    },
  });
};

export default useGenerateResourceMutation;
