export const config = {
  eduPromptApiUrl: process.env.EXPO_PUBLIC_EDU_PROMPT_API || "",
  eduPromptSocketUrl: process.env.EXPO_PUBLIC_EDU_PROMPT_SOCKET || "",
  nextjsUrl: process.env.EXPO_PUBLIC_NEXTJS_URL || "",

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

  isDevelopment: process.env.EXPO_PUBLIC_APP_ENV === "development",
  isProduction: process.env.EXPO_PUBLIC_APP_ENV === "production",
} as const;
