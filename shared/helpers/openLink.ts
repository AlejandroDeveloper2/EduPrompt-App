import { openBrowserAsync } from "expo-web-browser";

export const openLink = async (url: string): Promise<void> => {
  await openBrowserAsync(url);
};
