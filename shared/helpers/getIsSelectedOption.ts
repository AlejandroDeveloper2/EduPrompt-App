/**
 * Determina si una opción dada está seleccionada comparando una propiedad identificadora.
 *
 * Esta función es útil cuando se trabaja con listas de opciones (por ejemplo, selectores o dropdowns)
 * donde se necesita verificar si una opción específica coincide con la actualmente seleccionada.
 *
 * @template T - Tipo genérico del objeto de opción (por ejemplo, `{ id: number, name: string }`).
 * @param {T} option - Opción actual que se está evaluando.
 * @param {T | null} selectedOption - Opción actualmente seleccionada, o `null` si no hay selección.
 * @param {keyof T} optionIdkey - Clave del objeto usada como identificador único para comparar opciones (por ejemplo, `"id"`).
 * @returns {boolean} `true` si la opción actual está seleccionada; `false` en caso contrario.
 *
 * @example
 * // Ejemplo con un array de usuarios
 * const users = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" }
 * ];
 *
 * const selected = { id: 2, name: "Bob" };
 *
 * // Retorna true
 * getIsSelectedOption(users[1], selected, "id");
 *
 * // Retorna false
 * getIsSelectedOption(users[0], selected, "id");
 */
export const getIsSelectedOption = <T>(
  option: T,
  selectedOption: T | null,
  optionIdkey: keyof T
): boolean => {
  const isSelected: boolean = selectedOption
    ? option[optionIdkey] === selectedOption[optionIdkey]
    : false;

  return isSelected;
};
