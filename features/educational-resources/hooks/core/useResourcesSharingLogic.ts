import { useRouter } from "expo-router";
import { useMemo, useState } from "react";

import { useTranslations } from "@/shared/hooks/core";
import { useResourcesFiltersContext } from "../context";
import { useResourcesQuery } from "../queries";

const useResourcesSharingLogic = () => {
  const [sharingSteps] = useState<{ stepId: string }[]>(() => [
    { stepId: "step1" },
    { stepId: "step2" },
  ]);
  const [currentSharingStep, setCurrentSharingStep] = useState<{
    stepId: string;
  }>(() => sharingSteps[0]);

  const router = useRouter();

  const { searchResourceValue, formatFilter, tagFilter } =
    useResourcesFiltersContext();

  const { t } = useTranslations();

  const { data } = useResourcesQuery(
    {
      title: searchResourceValue,
      tag: tagFilter?.tagId,
      formatKey: formatFilter ?? undefined,
    },
    { limit: 10 },
  );

  const resources = useMemo(
    () => data?.pages.flatMap((r) => r.records) ?? [],
    [data],
  );

  const onSharingStepChange = (sharingStep: { stepId: string }): void => {
    setCurrentSharingStep(sharingStep);
  };

  const onCloseSharingSheet = (): void => {
    router.navigate("/(app)/(tabs)/resources_screen");
  };

  return {
    t,
    sharingSteps,
    currentSharingStep,
    resources,
    onSharingStepChange,
    onCloseSharingSheet,
  };
};

export default useResourcesSharingLogic;
