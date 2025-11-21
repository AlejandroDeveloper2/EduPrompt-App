import { ReactNode } from "react";
import { View } from "react-native";

import {
  GenerationStep,
  GenerationStepNameType,
  IaGeneration,
} from "@/features/generations/types";

import { useGenerationsStore } from "@/features/generations/hooks/store";

import { renderGenerationStepImage } from "@/features/generations/utils";

import { ScreenSection } from "@/shared/components/atoms";
import { Button, Stepper } from "@/shared/components/molecules";

import { GenerationStepViewStyles } from "./GenerationStepView.style";

import CountryForm from "../country-form/CountryForm";
import EducationalLevelForm from "../educational-level-form/EducationalLevelForm";
import LanguageForm from "../language-form/LanguageForm";
import ResourceDescriptionForm from "../resource-description-form/ResourceDescriptionForm";
import ResourceFormatForm from "../resource-format-form/ResourceFormatForm";
import ResourceTypeForm from "../resource-type-form/ResourceTypeForm";
import SubjectForm from "../subject-form/SubjectForm";

interface GenerationStepViewProps {
  currentIaGeneration: IaGeneration;
}

const stepForms: Record<GenerationStepNameType, ReactNode> = {
  resource_type_selection: <ResourceTypeForm />,
  subject_name: <SubjectForm />,
  educational_level_selection: <EducationalLevelForm />,
  country_selection: <CountryForm />,
  resource_format_selection: <ResourceFormatForm />,
  language_selection: <LanguageForm />,
  resource_description_prompt: <ResourceDescriptionForm />,
};

const GenerationStepView = ({
  currentIaGeneration,
}: GenerationStepViewProps) => {
  const { setGenerationStep, clearSelectedGeneration } = useGenerationsStore();

  return (
    <View style={{ alignItems: "flex-end" }}>
      <Button
        icon="chevron-back-outline"
        label="Volver"
        variant="neutral"
        width="auto"
        onPress={clearSelectedGeneration}
      />
      <View style={GenerationStepViewStyles.StepContainer}>
        {renderGenerationStepImage(
          currentIaGeneration.currentStep.illustration
        )}
        <ScreenSection
          icon={currentIaGeneration.currentStep.icon}
          description={currentIaGeneration.currentStep.description}
          title={currentIaGeneration.currentStep.title}
        />
        {stepForms[currentIaGeneration.currentStep.generationStepId]}
      </View>
      <Stepper<GenerationStep>
        steps={currentIaGeneration.steps}
        currentStep={currentIaGeneration.currentStep}
        stepIdKey="generationStepId"
        style={{ margin: "auto" }}
        onActive={(stepId) =>
          setGenerationStep(
            currentIaGeneration.generationId,
            stepId as GenerationStepNameType
          )
        }
      />
    </View>
  );
};

export default GenerationStepView;
