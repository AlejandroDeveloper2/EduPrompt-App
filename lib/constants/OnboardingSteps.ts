import { Lang, Step } from "../types/data-types";

export const ONBOARDING_STEPS: Lang<Step> = {
  en: [],
  es: [
    {
      stepId: "1",
      stepIcon: "bulb-outline",
      stepTitle: "Bienvenido a Edu Prompt",
      description:
        "Crea recursos educativos con inteligencia artificial en segundos. Diseña guías para planificar tus clases, lecciones completas, preguntas de evaluación, tareas para tus estudiantes ¡y mucho más! Ahorra tiempo y enfócate en lo que realmente importa: enseñar.",
      stepIllustration: "FirstStepImage",
    },
    {
      stepId: "2",
      stepIcon: "pencil-outline",
      stepTitle: "Personaliza tu contenido",
      description:
        "Selecciona el país, grado, materia, idioma y tipo de recurso. EduPrompt adapta el contenido a las necesidades reales de tus estudiantes.",
      stepIllustration: "SecondStepImage",
    },
    {
      stepId: "3",
      stepIcon: "settings-outline",
      stepTitle: "Gestiona tus recursos",
      description:
        "Guarda, edita, elimina y descarga tus recursos en formatos como PDF, TXT o imagen. Administra todo desde tu dispositivo, sin conexión a internet.",
      stepIllustration: "ThirdStepImage",
    },
    {
      stepId: "4",
      stepIcon: "hardware-chip-outline",
      stepTitle: "Usa tus tokens para crear",
      description:
        "EduPrompt funciona sin registro. Solo necesitas conexión para generar recursos o comprar tokens. Usa tus tokens disponibles y sigue creando sin límites.",
      stepIllustration: "FourthStepImage",
    },
  ],
  pt: [],
};
