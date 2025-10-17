import { AppEvents } from "./events";

import { EventHandler, EventKey } from "./types";

/**
 * Implementación de un bus de eventos con seguridad de tipos que gestiona suscripciones y emisiones de eventos.
 *
 * @template EventKey - El tipo de claves de eventos que se pueden utilizar
 * @template AppEvents - Un mapeo de claves de eventos a sus tipos de payload correspondientes
 *
 * @example
 * ```typescript
 * const bus = new EventBus();
 *
 * // Suscribirse a un evento
 * bus.on('userLoggedIn', (user) => {
 *   console.log('Usuario conectado:', user);
 * });
 *
 * // Emitir un evento
 * bus.emit('userLoggedIn', { id: 1, name: 'Juan' });
 * ```
 */
class EventBus {
  /** Mapa que almacena los listeners para cada tipo de evento */
  private listeners: Map<EventKey, Set<(payload: any) => void>> = new Map();

  /** Mapa que almacena el último payload emitido para cada tipo de evento */
  private lastPayloads: Map<EventKey, any> = new Map();

  /**
   * Suscribe un manejador a un evento específico
   * @param event - El tipo de evento a escuchar
   * @param handler - La función que maneja el evento
   * @param options - Opciones de suscripción (immediate: ejecutar inmediatamente con último payload)
   * @returns Función para cancelar la suscripción
   */
  on<K extends EventKey>(
    event: K,
    handler: EventHandler<K>,
    options?: { immediate?: boolean }
  ): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    this.listeners.get(event)!.add(handler as (payload: any) => void);

    // ⚡ Ejecutar inmediatamente SOLO si se solicita (por default NO)
    if (options?.immediate && this.lastPayloads.has(event)) {
      handler(this.lastPayloads.get(event) as AppEvents[K]);
    }

    return () => this.off(event, handler);
  }

  /**
   * Cancela la suscripción de un manejador para un evento específico
   * @param event - El tipo de evento
   * @param handler - El manejador a eliminar
   */
  off<K extends EventKey>(event: K, handler: EventHandler<K>): void {
    this.listeners.get(event)?.delete(handler as (payload: any) => void);
  }
  /**
   * Emite un evento con su payload correspondiente
   * @param event - El tipo de evento a emitir
   * @param payload - Los datos asociados al evento
   */
  emit<K extends EventKey>(event: K, payload: AppEvents[K]): void {
    this.lastPayloads.set(event, payload);
    this.listeners.get(event)?.forEach((handler) => {
      (handler as EventHandler<K>)(payload);
    });
  }
  /**
   * Suscribe un manejador que se ejecutará una única vez
   * @param event - El tipo de evento
   * @param handler - El manejador del evento
   */
  once<K extends EventKey>(event: K, handler: EventHandler<K>): void {
    const wrapper: EventHandler<K> = (payload) => {
      handler(payload);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
  /**
   * Elimina todos los listeners registrados
   */
  clearAll(): void {
    this.listeners.clear();
  }
  /**
   * Obtiene el último payload emitido para un tipo de evento
   * @param event - El tipo de evento
   * @returns El último payload o undefined si no hay
   */
  getLast<K extends EventKey>(event: K): AppEvents[K] | undefined {
    return this.lastPayloads.get(event);
  }
}

export const eventBus = new EventBus();
