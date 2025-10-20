import { Linking } from "react-native";

export const openExternalLink = async (url: string) => {
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    console.warn("No se puede abrir la URL:", url);
  }
};
