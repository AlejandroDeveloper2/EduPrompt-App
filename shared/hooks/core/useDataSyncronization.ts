import { useCallback, useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { AppModules } from "@/core/store/sync-data-store/store-types";

import { useSyncDataStore } from "@/core/store";
import { useEventbusValue } from "../events";
import useCheckNetwork from "./useCheckNetwork";
import useTranslations from "./useTranslations";

import { showToast } from "@/shared/context/toast-context/showToast";
import { generateToastKey } from "@/shared/helpers";

const useDataSyncronization = () => {
  const { moduleSyncMap, runDataSyncronization } = useSyncDataStore(
    useShallow(({ moduleSyncMap, runDataSyncronization }) => ({
      moduleSyncMap,
      runDataSyncronization,
    })),
  );
  const { t } = useTranslations();
  const { isConnected } = useCheckNetwork();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);
  const userProfile = useEventbusValue("userProfile.user.updated", null);

  /** Función para ejecutar la sincronización de los módulos */
  const syncronize = useCallback(async () => {
    if (isConnected === false) {
      showToast({
        key: generateToastKey(),
        variant: "danger",
        message: t("common_translations.sync_data_messages.no_connected_msg"),
      });
      return;
    }

    if (!isAuthenticated) {
      showToast({
        key: generateToastKey(),
        variant: "danger",
        message: t("common_translations.sync_data_messages.no_auth_msg"),
      });
      return;
    }

    let modulesToSync: AppModules[] = [];

    moduleSyncMap.forEach((value, key) => {
      if (!value.isDataSynced) modulesToSync.push(key);
    });

    await runDataSyncronization(modulesToSync)
      .then(() => {
        showToast({
          key: generateToastKey(),
          variant: "primary",
          message: t("common_translations.sync_data_messages.all_synced_msg"),
        });
      })
      .finally(() => (modulesToSync = []));
  }, [isAuthenticated, isConnected, moduleSyncMap, runDataSyncronization, t]);

  /** Variable para manejar estados de carga */
  const isSyncing: boolean = useMemo(() => {
    const values = Array.from(moduleSyncMap.values());
    return values.some((value) => value.syncing);
  }, [moduleSyncMap]);

  /** Variable para identificar si todo esta sincronizado */
  const isAllSynced: boolean = useMemo(() => {
    const values = Array.from(moduleSyncMap.values());
    return values.every((value) => value.isDataSynced);
  }, [moduleSyncMap]);

  /** Variable para identificar si hay un error */
  const isError: boolean = useMemo(() => {
    const values = Array.from(moduleSyncMap.values());
    return values.some((value) => value.error !== null);
  }, [moduleSyncMap]);

  /** Ejecuta sincronización automatica si en las configuraciones
   * del usuario esta esta habilitada */
  useEffect(() => {
    if (userProfile && userProfile.userPreferences.autoSync && !isAllSynced)
      syncronize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile, isAllSynced]);

  return {
    syncronize,
    isSyncing,
    isAllSynced,
    isError,
  };
};

export default useDataSyncronization;
