/**
 * Genera una clave alfanumérica pseudoaleatoria de 10 caracteres destinada a usarse como identificador de toast.
 *
 * La clave está compuesta por los caracteres:
 *   "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
 *
 * @returns Una cadena alfanumérica de 10 caracteres.
 *
 * @example
 * const key = generateToastKey();
 * // -> "aZ3b9K0fPq"
 *
 * @remarks
 * - La función usa Math.random() y no es adecuada para necesidades criptográficas.
 * - La longitud de la cadena devuelta es siempre 10.
 */
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
