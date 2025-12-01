import uuid from "react-native-uuid";

import { GenerationData, GenerationStep, IaGeneration } from "../../types";

export const initialGenerationData: GenerationData = {
  resourceType: {
    resourceTypeId: "",
    resourceTypeLabel: "",
  },
  subjectName: "",
  educationalLevel: {
    educationalLevelId: "",
    educationalLevelLabel: "",
  },
  country: {
    countryId: "",
    countryName: "",
  },
  resourceFormat: {
    formatKey: "text",
    formatLabel: "Texto",
  },
  language: {
    key: "es",
    label: "Español",
  },
  resourceDescriptionPrompt: "",
};

const steps: GenerationStep[] = [
  {
    generationStepId: "resource_type_selection",
    completed: false,
    icon: "shapes-outline",
    illustration: "FirstFormStepImage",
    title: "Tipo de recurso que deseas",
    description:
      "Escoge el tipo de recurso que deseas  por ejemplo Guías de estudio, Tareas para el estudiante, Diapositivas etc.",
  },
  {
    generationStepId: "subject_name",
    completed: false,
    icon: "book-outline",
    illustration: "SecondFormStepImage",
    title: "Materia o asignatura",
    description:
      "Digita el nombre de la materia o asignatura la cual quieres que el recurso este relacionado. Ejemplo: matemáticas, sociales, biología, calculo etc.",
  },
  {
    generationStepId: "educational_level_selection",
    completed: false,
    icon: "school-outline",
    illustration: "ThirdFormStepImage",
    title: "Nivel educativo objetivo",
    description:
      "Selecciona el nivel educativo objetivo es decir si el recurso que quieres generar es para primaria, secundaria o educación superior por ejemplo universitario.",
  },
  {
    generationStepId: "country_selection",
    completed: false,
    icon: "flag-outline",
    illustration: "FourthFormStepImage",
    title: "Selección del país",
    description:
      "Selecciona un país para que EduPrompt genere el recurso académico en base a los estándares educativos del país seleccionado.",
  },
  {
    generationStepId: "resource_format_selection",
    completed: false,
    icon: "image-outline",
    illustration: "FivethFormStepImage",
    title: "Formato del recurso",
    description:
      "Selecciona el formato deseado para generar tu recurso educativo. Puedes elegir si quieres formato texto, imagen, tabla o gráfico.",
  },
  {
    generationStepId: "language_selection",
    completed: false,
    icon: "language-outline",
    illustration: "SixthFormStepImage",
    title: "Idioma del recurso",
    description:
      "Selecciona el idioma deseado para generar tu recurso educativo. Puedes elegir si quieres el recurso en Inglés, Español o Portugués.",
  },
  {
    generationStepId: "resource_description_prompt",
    completed: false,
    icon: "chatbubble-ellipses-outline",
    illustration: "SeventhFormStepImage",
    title: "Descripción de tu recurso",
    description:
      "Describe tu recurso solicitado de forma clara y concisa. Puedes guardar el prompt que escribas para usarlo en otra generación  o buscar uno ya existente o generar uno con IA.",
  },
];
export const buildNewGeneration = (title: string): IaGeneration => {
  return {
    generationId: uuid.v4(),
    title,
    currentStep: steps[0],
    steps,
    canDelete: true,
    generationCompleted: false,
    isGenerating: false,
    data: initialGenerationData,
    result: null,
  };
};
