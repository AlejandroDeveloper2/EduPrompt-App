import { AppEvents } from "./events";

import { EventHandler, EventKey } from "./types";

class EventBus {
  private listeners: Map<EventKey, Set<(payload: any) => void>> = new Map();
  private lastPayloads: Map<EventKey, any> = new Map();

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

  off<K extends EventKey>(event: K, handler: EventHandler<K>): void {
    this.listeners.get(event)?.delete(handler as (payload: any) => void);
  }

  emit<K extends EventKey>(event: K, payload: AppEvents[K]): void {
    this.lastPayloads.set(event, payload);
    this.listeners.get(event)?.forEach((handler) => {
      (handler as EventHandler<K>)(payload);
    });
  }

  once<K extends EventKey>(event: K, handler: EventHandler<K>): void {
    const wrapper: EventHandler<K> = (payload) => {
      handler(payload);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }

  clearAll(): void {
    this.listeners.clear();
  }

  getLast<K extends EventKey>(event: K): AppEvents[K] | undefined {
    return this.lastPayloads.get(event);
  }
}

export const eventBus = new EventBus();
