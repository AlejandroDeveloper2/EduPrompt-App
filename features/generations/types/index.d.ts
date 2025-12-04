import { AppLanguage } from "@/core/types";
import { Ionicons } from "@expo/vector-icons";

type ResourceFormatKey = "text" | "image" | "chart" | "table";

type IllustrationType =
  | "FirstFormStepImage"
  | "SecondFormStepImage"
  | "ThirdFormStepImage"
  | "FourthFormStepImage"
  | "FivethFormStepImage"
  | "SixthFormStepImage"
  | "SeventhFormStepImage";

type GenerationStepNameType =
  | "resource_type_selection"
  | "subject_name"
  | "educational_level_selection"
  | "country_selection"
  | "resource_format_selection"
  | "language_selection"
  | "resource_description_prompt";

interface GenerationData {
  resourceType: ResourceType;
  subjectName: string;
  educationalLevel: EducationalLevel;
  country: Country;
  resourceFormat: ResourceFormat;
  language: AppLanguage;
  resourceDescriptionPrompt: string;
}

interface GenerationStep {
  generationStepId: GenerationStepNameType;
  completed: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  illustration: IllustrationType;
  title: string;
  description: string;
}

interface IaGeneration {
  generationId: string;
  title: string;
  currentStep: GenerationStep;
  steps: GenerationStep[];
  canDelete: boolean;
  isGenerating: boolean;
  generationCompleted: boolean;
  data: GenerationData;
  result: AssistantResponse | null;
  isSelected: boolean;
}

interface ResourceType {
  resourceTypeId: string;
  resourceTypeLabel: string;
  other?: string;
}

interface EducationalLevel {
  educationalLevelId: string;
  educationalLevelLabel: string;
  grade?: GradeLevel;
}
interface GradeLevel {
  gradeLevelId: string;
  gradeLevelLabel: string;
}

interface Country {
  countryId: string;
  countryName: string;
}

interface ResourceFormat {
  formatKey: ResourceFormatKey;
  formatLabel: string;
}

interface AssistantResponse {
  generationDate: Date;
  result: string;
}

export type {
  AssistantResponse,
  Country,
  EducationalLevel,
  GenerationData,
  GenerationStep,
  GenerationStepNameType,
  GradeLevel,
  IaGeneration,
  IllustrationType,
  ResourceFormat,
  ResourceFormatKey,
  ResourceType,
};
