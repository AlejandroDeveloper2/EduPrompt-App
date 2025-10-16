import { AppEvents } from "./events";

import { EventHandler, EventKey } from "./types";

class EventBus {
  private listeners: Map<EventKey, Set<(payload: any) => void>> = new Map();

  on<K extends EventKey>(event: K, handler: EventHandler<K>): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler as (payload: any) => void);
  }

  off<K extends EventKey>(event: K, handler: EventHandler<K>): void {
    this.listeners.get(event)?.delete(handler as (payload: any) => void);
  }

  emit<K extends EventKey>(event: K, payload: AppEvents[K]): void {
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
}

export const eventBus = new EventBus();
