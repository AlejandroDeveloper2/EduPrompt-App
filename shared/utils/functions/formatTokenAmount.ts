/**
 * Formatea una cantidad numérica representando un monto de tokens en un formato
 * legible y compacto, utilizando sufijos abreviados (`K` para miles, `M` para millones).
 *
 * El formato se ajusta según la magnitud del número:
 * - Si el número tiene entre 5 y 6 dígitos, se formatea en miles (por ejemplo, `12500` → `12.5K`).
 * - Si el número tiene más de 6 dígitos, se formatea en millones (por ejemplo, `2300000` → `2.3M`).
 * - En caso contrario, se devuelve el número con separadores de miles estándar según la configuración local.
 * - Si el número es negativo, se devuelve `"0"`.
 *
 * @example
 * ```ts
 * formatTokenAmount(-50);        // "0"
 * formatTokenAmount(950);        // "950"
 * formatTokenAmount(12000);      // "12K"
 * formatTokenAmount(15600);      // "15.6K"
 * formatTokenAmount(2350000);    // "2.35M"
 * ```
 *
 * @param {number} amount - Cantidad numérica a formatear.
 * Si el valor es negativo, se devuelve `"0"`.
 *
 * @returns {string} Una cadena formateada que representa el monto de tokens
 * en formato compacto (`K`, `M`) o completo según corresponda.
 *
 * @remarks
 * - Los valores negativos se normalizan a cero para evitar mostrar montos inválidos.
 * - La función usa `toLocaleString()` para formatear con separadores decimales,
 *   por lo que el formato puede variar según la configuración regional del entorno.
 * - Los sufijos (`K`, `M`) son fijos y no localizados.
 */
export const formatTokenAmount = (amount: number): string => {
  let formattedAmount: string = "";

  if (amount < 0) {
    formattedAmount = (0).toLocaleString();
    return formattedAmount;
  }

  const hasUnitOfThousand =
    amount.toString().length >= 5 && amount.toString().length <= 6;
  const hasUnitOfMillion = amount.toString().length >= 6;

  const parsedAmount = amount.toLocaleString();

  if (hasUnitOfThousand) {
    const unitsOfThousand = parsedAmount.split(".")[0];
    const hundreds = parsedAmount.split(".")[1];

    formattedAmount =
      parseInt(hundreds) >= 100
        ? `${unitsOfThousand}.${hundreds.charAt(0)}K`
        : `${unitsOfThousand}K`;
    return formattedAmount;
  }

  if (hasUnitOfMillion) {
    const unitsOfMillion = parsedAmount.split(".")[0];
    const unitsOfThousand = parsedAmount.split(".")[1];
    formattedAmount =
      parseInt(unitsOfThousand) >= 100
        ? `${unitsOfMillion}.${unitsOfThousand.substring(0, 2)}M`
        : `${unitsOfMillion}M`;
    return formattedAmount;
  }

  formattedAmount = parsedAmount;
  return formattedAmount;
};
