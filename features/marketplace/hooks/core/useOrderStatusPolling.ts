import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import { getOrderStatus } from "../../services";

import { OrderStatus } from "../../types";

interface UseOrderStatusPollingOptions {
  orderId: string | null;
  enabled: boolean;
  intervalMs?: number;
  maxAttempts?: number;
  onStatusChange: (status: OrderStatus, orderId: string) => void;
  onTimeout?: () => void;
}

const TERMINAL_STATUSES: OrderStatus[] = ["APPROVED", "COMPLETED", "CANCELLED"];

const useOrderStatusPolling = ({
  orderId,
  enabled,
  intervalMs = 2000, // Consultar cada 2 segundos
  maxAttempts = 60, // Máximo 2 minutos (60 * 2s)
  onStatusChange,
  onTimeout,
}: UseOrderStatusPollingOptions) => {
  const queryClient = useQueryClient();
  const attemptsRef = useRef(0);
  const timeoutFiredRef = useRef(false);

  const { data, fetchStatus } = useQuery({
    queryKey: ["order_status", orderId],
    queryFn: async () => {
      attemptsRef.current += 1;
      return getOrderStatus(orderId!);
    },
    enabled: enabled && !!orderId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status && TERMINAL_STATUSES.includes(status)) return false;
      if (attemptsRef.current >= maxAttempts) return false;
      return intervalMs;
    },
    refetchIntervalInBackground: true,
    retry: false,
    staleTime: 0,
  });

  // Reaccionar a estado terminal
  useEffect(() => {
    if (!data || !TERMINAL_STATUSES.includes(data.status)) return;
    onStatusChange(data.status, data.orderId);
  }, [data, onStatusChange]);

  // Reaccionar a timeout
  useEffect(() => {
    if (
      attemptsRef.current >= maxAttempts &&
      !timeoutFiredRef.current &&
      enabled
    ) {
      timeoutFiredRef.current = true;
      onTimeout?.();
    }
  });

  // Limpiar la query al desactivar
  useEffect(() => {
    if (!enabled) {
      attemptsRef.current = 0;
      timeoutFiredRef.current = false;
      queryClient.removeQueries({ queryKey: ["order_status", orderId] });
    }
  }, [enabled, orderId, queryClient]);

  return {
    isPolling: fetchStatus === "fetching",
  };
};

export default useOrderStatusPolling;
