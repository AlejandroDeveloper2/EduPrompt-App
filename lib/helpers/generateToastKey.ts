export const generateToastKey = (): string => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let toastKey: string = "";
  for (let index = 0; index < 10; index++) {
    const randomIndex: number = Math.random() * characters.length;
    const randomChar = characters.charAt(randomIndex);
    toastKey += randomChar;
  }

  return toastKey;
};
