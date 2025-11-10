/** Configuración de variables de entorno */
export const config = {
  eduPromptApiUrl:
    process.env.NODE_ENV === "production"
      ? process.env.EXPO_PUBLIC_PRODUCTION_EDU_PROMPT_API || ""
      : process.env.EXPO_PUBLIC_DEVELOPMENT_EDU_PROMPT_API || "",
  eduPromptSocketUrl:
    process.env.EXPO_PUBLIC_DEVELOPMENT_EDU_PROMPT_SOCKET || "",
  tokenDailyRewardAmount:
    process.env.EXPO_PUBLIC_TOKEN_DAILY_REWARD_AMOUNT || "0",
  textResourcePrice: parseInt(
    process.env.EXPO_PUBLIC_TEXT_RESOURCE_PRICE || "1"
  ),
  imageResourcePrice: parseInt(
    process.env.EXPO_PUBLIC_IMAGE_RESOURCE_PRICE || "2"
  ),
  tableResourcePrice: parseInt(
    process.env.EXPO_PUBLIC_TABLE_RESOURCE_PRICE || "2"
  ),
  chartResourcePrice: parseInt(
    process.env.EXPO_PUBLIC_CHART_RESOURCE_PRICE || "2"
  ),
};
