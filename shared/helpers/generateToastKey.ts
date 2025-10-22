import uuid from "react-native-uuid";

/** Genera un id único como identificador de un toast */
export const generateToastKey = (): string => {
  return uuid.v4();
};
