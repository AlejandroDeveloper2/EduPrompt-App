/** Configuración de variables de entorno */
export const config = {
  eduPromptApiUrl:
    process.env.NODE_ENV === "production"
      ? process.env.EXPO_PUBLIC_PRODUCTION_EDU_PROMPT_API || ""
      : process.env.EXPO_PUBLIC_DEVELOPMENT_EDU_PROMPT_API || "",
};
