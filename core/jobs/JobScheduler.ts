import { addDays, addHours, isAfter } from "date-fns";
import AsyncStorage from "expo-sqlite/kv-store";
import { AppState } from "react-native";

import { ASYNC_STORAGE_KEYS } from "@/shared/constants";
import { Job } from "./types";

/**
 * Planificador de trabajos en segundo plano.
 *
 * - Permite registrar trabajos (jobs) con un identificador y un intervalo.
 * - Ejecuta los trabajos cuando la app vuelve a estado activo o al inicializarse.
 * - Persiste el último momento de ejecución de cada trabajo para calcular la próxima corrida.
 */
class JobScheduler {
  /**
   * Mapa de trabajos registrados, indexados por su id.
   */
  private jobs = new Map<string, Job>();

  /**
   * Bandera para evitar inicializaciones múltiples del planificador.
   */
  private initialized = false;

  /**
   * Inicializa el planificador y programa la ejecución de los trabajos.
   *
   * - Añade un listener al estado de la app para disparar la ejecución
   *   cuando la app vuelve a estar activa.
   * - Ejecuta inmediatamente una pasada de verificación/ejecución.
   */
  init(): void {
    if (this.initialized) return;
    this.initialized = true;

    AppState.addEventListener("change", (state) => {
      if (state === "active") {
        this.runJobs();
      }
    });

    this.runJobs();
  }

  /**
   * Registra un nuevo trabajo en el planificador.
   *
   * @param job Trabajo a registrar. Debe incluir un id único, un intervalo y la función run.
   */
  register(job: Job): void {
    this.jobs.set(job.id, job);
  }

  /**
   * Recorre los trabajos registrados y ejecuta aquellos que corresponda.
   *
   * Criterios de ejecución:
   * - Si el trabajo nunca se ha ejecutado, se ejecuta inmediatamente.
   * - Si ya se ejecutó, se compara la fecha/hora actual con su próxima ejecución calculada
   *   en base al intervalo. Si ya corresponde, se ejecuta.
   *
   * Efectos colaterales:
   * - Persiste en almacenamiento el timestamp de la última ejecución por id de trabajo.
   */
  private async runJobs(): Promise<void> {
    const now = new Date();

    for (const job of this.jobs.values()) {
      const lastRunRaw = AsyncStorage.getItemSync(
        `${ASYNC_STORAGE_KEYS.jobLastRun}:${job.id}`
      );

      const lastRun = lastRunRaw ? new Date(JSON.parse(lastRunRaw)) : null;

      const nextRun = this.getNextRun(job.interval, lastRun);

      if (!lastRun || isAfter(now, nextRun)) {
        await job.run();
        AsyncStorage.setItemSync(
          `${ASYNC_STORAGE_KEYS.jobLastRun}:${job.id}`,
          JSON.stringify(now)
        );
      }
    }
  }

  /**
   * Calcula la próxima fecha/hora de ejecución a partir del intervalo y el último run.
   *
   * Reglas:
   * - Si no existe un último run, retorna el epoch (fecha 0) para forzar ejecución inmediata.
   * - Si el intervalo es "daily" suma 1 día al último run.
   * - Si el intervalo es "hourly" suma 1 hora al último run.
   * - Si el intervalo es numérico, lo interpreta como milisegundos a sumar.
   *
   * @param interval Intervalo del trabajo ("daily" | "hourly" | milisegundos).
   * @param lastRun Fecha de la última ejecución o null si nunca se ejecutó.
   * @returns Fecha/hora en la que debería ejecutarse nuevamente el trabajo.
   */
  private getNextRun(interval: Job["interval"], lastRun: Date | null): Date {
    if (!lastRun) return new Date(0);

    if (interval === "daily") return addDays(lastRun, 1);
    if (interval === "hourly") return addHours(lastRun, 1);

    return new Date(lastRun.getTime() + interval);
  }
}

/**
 * Instancia única del planificador para ser reutilizada en la app.
 */
export const jobScheduler = new JobScheduler();
