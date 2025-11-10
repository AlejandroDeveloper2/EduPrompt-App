import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AssistantResponse, GenerationData } from "../../types";

import { eventBus } from "@/core/events/EventBus";
import { showToast } from "@/shared/context";

import { useGenerationsStore } from "../store";

import { generateToastKey } from "@/shared/helpers";
import { formatGenerationData, getResourcePrice } from "../../helpers";

import { postGenerateEducationalResource } from "../../services";

const useGenerateResource = () => {
  const queryClient = useQueryClient();
  const {
    currentIaGeneration,
    deleteIaGeneration,
    updateIaGeneration,
    getIaGeneration,
  } = useGenerationsStore();

  return useMutation({
    mutationFn: async (generationData: GenerationData) => {
      const formattedData = formatGenerationData(generationData);
      const iaResponse = await postGenerateEducationalResource(
        formattedData,
        generationData.resourceFormat.formatKey
      );
      return iaResponse;
    },
    onSuccess: (data) => {
      queryClient.setQueryData<AssistantResponse>(
        ["ia_generation_result"],
        data
      );

      if (currentIaGeneration) {
        updateIaGeneration(
          currentIaGeneration.generationId,
          {},
          {},
          { isGenerating: false }
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

        deleteIaGeneration(currentIaGeneration.generationId);
      }

      showToast({
        key: generateToastKey(),
        variant: "primary",
        message: "Recurso generado correctamente",
      });
    },
  });
};

export default useGenerateResource;
