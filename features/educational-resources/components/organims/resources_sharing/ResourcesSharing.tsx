import { View } from "react-native";

import { AppColors } from "@/shared/styles";

import { useResourcesSharingLogic } from "@/features/educational-resources/hooks/core";

import { Typography } from "@/shared/components/atoms";
import { Stepper } from "@/shared/components/molecules";
import NameResourcesGroupForm from "../name-resources-group-form/NameResourcesGroupForm";
import ShareResourcesPanel from "../share-resources-panel/ShareResourcesPanel";

import { GlobalStyles } from "@/shared/styles/GlobalStyles.style";

const ResourcesSharing = () => {
  const {
    t,
    resources,
    onCloseSharingSheet,
    sharingSteps,
    currentSharingStep,
    onSharingStepChange,
  } = useResourcesSharingLogic();

  return (
    <>
      <View style={GlobalStyles.SheetHeaderContainer}>
        <View style={GlobalStyles.ClosePopUpDragIndicator} />
        <Typography
          text={t("resources_translations.share_resource_popup_labels.title")}
          weight="medium"
          type="h2"
          textAlign="center"
          color={AppColors.neutral[1000]}
          width="100%"
          icon="share-outline"
        />
      </View>
      {currentSharingStep.stepId === "step1" ? (
        <ShareResourcesPanel
          resources={resources}
          goNext={() => onSharingStepChange({ stepId: "step2" })}
        />
      ) : (
        <NameResourcesGroupForm
          goBack={() => onSharingStepChange({ stepId: "step1" })}
          closePopUp={onCloseSharingSheet}
          clearSteps={() => onSharingStepChange({ stepId: "step1" })}
        />
      )}
      <Stepper
        steps={sharingSteps}
        currentStep={currentSharingStep}
        onActive={(stepId) => onSharingStepChange({ stepId })}
        stepIdKey="stepId"
      />
    </>
  );
};

export default ResourcesSharing;
