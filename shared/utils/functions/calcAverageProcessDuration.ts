import { ASYNC_STORAGE_KEYS } from "@/shared/constants";
import AsyncStorage from "expo-sqlite/kv-store";

/**
 * Calcula la duración promedio para un proceso dado leyendo las duraciones desde la caché del QueryClient.
 *
 * @param queryClient - La instancia de QueryClient utilizada para leer datos en caché.
 * @param processName - La clave/nombre del proceso cuyas duraciones están almacenadas bajo la consulta 'processes_durations'.
 * @returns La duración promedio como número, o `null` si la entrada 'processes_durations' falta, no se encuentra el nombre del proceso, o el arreglo de duraciones está vacío.
 *
 * @remarks
 * - Se espera que el valor en caché en la clave de consulta ['processes_durations'] sea un Record<string, number[]>.
 * - La función no modifica la caché.
 *
 * @example
 * // Dada la caché: { processes_durations: { upload: [120, 80, 100] } }
 * // calcAvarageProcessDuration(queryClient, 'upload') -> 100
 */
export const calcAvarageProcessDuration = (
  processName: string
): number | null => {
  const data = AsyncStorage.getItemSync(
    ASYNC_STORAGE_KEYS.averageProcessDuration
  );
  const parsedData: Record<string, number[]> | null = data
    ? JSON.parse(data)
    : null;

  if (
    !parsedData ||
    !parsedData[processName] ||
    parsedData[processName].length === 0
  )
    return null;

  const durations = parsedData[processName];

  const averageDuration: number =
    durations.reduce((prevValue, currentValue) => prevValue + currentValue, 0) /
    durations.length;

  return averageDuration;
};
