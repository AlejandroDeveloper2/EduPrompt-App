import { io, Socket } from "socket.io-client";

import { config } from "../config/enviromentVariables";

let socket: Socket | null = null;

/**
 * Inicializa y retorna la instancia del socket global.
 * Si ya existe una, la reutiliza.
 */
export const getSocketClient = (): Socket => {
  if (!socket) {
    socket = io(config.eduPromptSocketUrl, {
      transports: ["websocket"], // fuerza WebSocket, evita polling
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("🟢 Conectado al servidor de sockets:", socket?.id);
    });

    socket.on("connect_error", (err) => {
      console.log("❌ Socket connection failed:", err.message);
    });

    socket.on("disconnect", (reason) => {
      console.log("🔴 Desconectado del servidor:", reason);
    });
  }

  return socket;
};
