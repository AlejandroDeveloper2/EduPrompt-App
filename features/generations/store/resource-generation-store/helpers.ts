import uuid from "react-native-uuid";

import { Lang, LangTag } from "@/core/types";
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

const steps: Lang<GenerationStep> = {
  es: [
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
  ],
  en: [
    {
      generationStepId: "resource_type_selection",
      completed: false,
      icon: "shapes-outline",
      illustration: "FirstFormStepImage",
      title: "Resource type you want",
      description:
        "Choose the type of resource you want, for example Study Guides, Student Assignments, Slides, etc.",
    },
    {
      generationStepId: "subject_name",
      completed: false,
      icon: "book-outline",
      illustration: "SecondFormStepImage",
      title: "Subject or course",
      description:
        "Enter the name of the subject or course you want the resource to be related to. Example: mathematics, social studies, biology, calculus, etc.",
    },
    {
      generationStepId: "educational_level_selection",
      completed: false,
      icon: "school-outline",
      illustration: "ThirdFormStepImage",
      title: "Target educational level",
      description:
        "Select the target educational level, that is, whether the resource you want to generate is for primary, secondary, or higher education such as university.",
    },
    {
      generationStepId: "country_selection",
      completed: false,
      icon: "flag-outline",
      illustration: "FourthFormStepImage",
      title: "Country selection",
      description:
        "Select a country so that EduPrompt generates the academic resource based on the educational standards of the selected country.",
    },
    {
      generationStepId: "resource_format_selection",
      completed: false,
      icon: "image-outline",
      illustration: "FivethFormStepImage",
      title: "Resource format",
      description:
        "Select the desired format to generate your educational resource. You can choose whether you want text, image, table, or chart format.",
    },
    {
      generationStepId: "language_selection",
      completed: false,
      icon: "language-outline",
      illustration: "SixthFormStepImage",
      title: "Resource language",
      description:
        "Select the desired language to generate your educational resource. You can choose whether you want the resource in English, Spanish, or Portuguese.",
    },
    {
      generationStepId: "resource_description_prompt",
      completed: false,
      icon: "chatbubble-ellipses-outline",
      illustration: "SeventhFormStepImage",
      title: "Description of your resource",
      description:
        "Describe your requested resource clearly and concisely. You can save the prompt you write to use it in another generation, or search for an existing one, or generate one with AI.",
    },
  ],
  pt: [
    {
      generationStepId: "resource_type_selection",
      completed: false,
      icon: "shapes-outline",
      illustration: "FirstFormStepImage",
      title: "Tipo de recurso que você deseja",
      description:
        "Escolha o tipo de recurso que você deseja, por exemplo Guias de estudo, Tarefas para o estudante, Slides, etc.",
    },
    {
      generationStepId: "subject_name",
      completed: false,
      icon: "book-outline",
      illustration: "SecondFormStepImage",
      title: "Matéria ou disciplina",
      description:
        "Digite o nome da matéria ou disciplina à qual você quer que o recurso esteja relacionado. Exemplo: matemática, estudos sociais, biologia, cálculo, etc.",
    },
    {
      generationStepId: "educational_level_selection",
      completed: false,
      icon: "school-outline",
      illustration: "ThirdFormStepImage",
      title: "Nível educacional alvo",
      description:
        "Selecione o nível educacional alvo, ou seja, se o recurso que você quer gerar é para ensino fundamental, ensino médio ou ensino superior, por exemplo universitário.",
    },
    {
      generationStepId: "country_selection",
      completed: false,
      icon: "flag-outline",
      illustration: "FourthFormStepImage",
      title: "Seleção do país",
      description:
        "Selecione um país para que o EduPrompt gere o recurso acadêmico com base nos padrões educacionais do país selecionado.",
    },
    {
      generationStepId: "resource_format_selection",
      completed: false,
      icon: "image-outline",
      illustration: "FivethFormStepImage",
      title: "Formato do recurso",
      description:
        "Selecione o formato desejado para gerar seu recurso educacional. Você pode escolher se quer formato texto, imagem, tabela ou gráfico.",
    },
    {
      generationStepId: "language_selection",
      completed: false,
      icon: "language-outline",
      illustration: "SixthFormStepImage",
      title: "Idioma do recurso",
      description:
        "Selecione o idioma desejado para gerar seu recurso educacional. Você pode escolher se quer o recurso em Inglês, Espanhol ou Português.",
    },
    {
      generationStepId: "resource_description_prompt",
      completed: false,
      icon: "chatbubble-ellipses-outline",
      illustration: "SeventhFormStepImage",
      title: "Descrição do seu recurso",
      description:
        "Descreva seu recurso solicitado de forma clara e concisa. Você pode salvar o prompt que você escrever para usá-lo em outra geração, ou buscar um já existente, ou gerar um com IA.",
    },
  ],
};

export const buildNewGeneration = (
  title: string,
  language: LangTag
): IaGeneration => {
  return {
    generationId: uuid.v4(),
    title,
    currentStep: steps[language][0],
    steps: steps[language],
    canDelete: true,
    generationCompleted: false,
    isGenerating: false,
    data: initialGenerationData,
    result: null,
  };
};
