import { useRouter } from "expo-router";
import { useMemo, useState } from "react";

import { Tab } from "@/core/types";

import { FORM_TABS } from "../../components/organims/user-profile-panel/constants";

import {
  useAlert,
  useCheckNetwork,
  useResponsive,
  useTranslations,
} from "@/shared/hooks/core";
import { useEventBusToggle, useEventbusValue } from "@/shared/hooks/events";

const useUserProfilePanel = () => {
  const { t } = useTranslations();
  const size = useResponsive();
  const { isConnected } = useCheckNetwork();
  const { isOpen, closeAlert, openAlert } = useAlert();

  const tabs = useMemo(() => FORM_TABS(t), [t]);

  const [activeFormTab, setActiveFormTab] = useState<Tab>(tabs[0]);

  const router = useRouter();
  const isAuth = useEventbusValue("auth.authenticated", false);
  const loading = useEventBusToggle("auth.logout.started", [
    "auth.logout.completed",
    "auth.logout.failed",
  ]);

  return {
    t,
    size,
    isConnected,
    isOpen,
    isAuth,
    tabs,
    router,
    loading,
    closeAlert,
    openAlert,
    activeFormTab,
    setActiveFormTab,
  };
};

export default useUserProfilePanel;
