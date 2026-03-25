/** Configuración de variables de entorno */
const ENV = process.env.APP_ENV || process.env.NODE_ENV || "development";
const isProduction = ENV === "production";

export const config = {
  eduPromptApiUrl: isProduction
    ? process.env.EXPO_PUBLIC_PRODUCTION_EDU_PROMPT_API || ""
    : process.env.EXPO_PUBLIC_DEVELOPMENT_EDU_PROMPT_API || "",

  eduPromptSocketUrl: isProduction
    ? process.env.EXPO_PUBLIC_PRODUCTION_EDU_PROMPT_SOCKET || ""
    : process.env.EXPO_PUBLIC_DEVELOPMENT_EDU_PROMPT_SOCKET || "",

  nextjsUrl: isProduction
    ? process.env.EXPO_PUBLIC_PRODUCTION_NEXTJS_URL || ""
    : process.env.EXPO_PUBLIC_NEXTJS_URL || "",

  tokenDailyRewardAmount:
    process.env.EXPO_PUBLIC_TOKEN_DAILY_REWARD_AMOUNT || "0",

  textResourcePrice: parseInt(
    process.env.EXPO_PUBLIC_TEXT_RESOURCE_PRICE || "1",
  ),
  imageResourcePrice: parseInt(
    process.env.EXPO_PUBLIC_IMAGE_RESOURCE_PRICE || "2",
  ),
  tableResourcePrice: parseInt(
    process.env.EXPO_PUBLIC_TABLE_RESOURCE_PRICE || "2",
  ),
  chartResourcePrice: parseInt(
    process.env.EXPO_PUBLIC_CHART_RESOURCE_PRICE || "2",
  ),

  paypalClientId: process.env.EXPO_PUBLIC_PAYPAL_CLIENT_ID || "",
} as const;
