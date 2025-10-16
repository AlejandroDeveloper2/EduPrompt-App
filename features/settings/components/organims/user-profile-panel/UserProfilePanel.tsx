import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import { Tab } from "@/core/types";
import { FormSectionComponentMap, FormSectionId } from "./types";

import { eventBus } from "@/core/events/EventBus";

import { FORM_TABS } from "./constants";

import { useAnimatedPopUp } from "@/shared/hooks/animations";
import { useAuth, useCheckNetwork } from "@/shared/hooks/core";
import { useEventBusToggle } from "@/shared/hooks/events";
import { useScreenDimensionsStore } from "@/shared/hooks/store";

import { Link, ScreenSection } from "@/shared/components/atoms";
import {
  Button,
  NoConnectionIndicator,
  Tabulator,
} from "@/shared/components/molecules";
import { Alert, PopUp } from "@/shared/components/organims";
import ChangePasswordForm from "./forms/ChangePasswordForm";
import UserEmailForm from "./forms/UpdateEmailForm";
import UpdateUsernameForm from "./forms/UpdateUsernameForm";

import { UserProfilePanelStyles } from "./UserProfilePanel.style";

const UserProfilePanel = () => {
  const [activeFormTab, setActiveFormTab] = useState<Tab>(FORM_TABS[0]);

  const router = useRouter();

  const isAuth = useAuth();
  const loading = useEventBusToggle("auth.logout.started", [
    "auth.logout.completed",
    "auth.logout.failed",
  ]);

  const { isConnected } = useCheckNetwork();
  const size = useScreenDimensionsStore();

  const {
    isPopUpMounted,
    dragGesture,
    animatedPopUpStyle,
    onClosePopUp,
    onOpenPopUp,
  } = useAnimatedPopUp();

  const Form: FormSectionComponentMap = {
    "tab-1": <UpdateUsernameForm />,
    "tab-2": <UserEmailForm />,
    "tab-3": <ChangePasswordForm />,
  };

  return (
    <>
      <PopUp
        icon="information-circle-outline"
        title="Alerta"
        isPopUpMounted={isPopUpMounted}
        gesture={dragGesture}
        animatedPopUpStyle={animatedPopUpStyle}
        onClosePopUp={onClosePopUp}
      >
        <Alert
          variant="danger"
          message="¿Seguro quieres cerrar sesión?"
          acceptButtonLabel="Cerrar sesión"
          loading={loading}
          loadingMessage="Cerrando sesión..."
          acceptButtonIcon="power-outline"
          onCancel={onClosePopUp}
          onAccept={() => eventBus.emit("auth.logout.requested", undefined)}
        />
      </PopUp>
      <View style={UserProfilePanelStyles(size).PanelContainer}>
        <ScreenSection
          description="Edita y visualiza tu perfil de Edu Prompt  en un solo lugar"
          title="Perfil de usuario"
          icon="person-outline"
        />
        {!isConnected ? (
          <NoConnectionIndicator message="No estas conectado a internet para acceder a tu perfil" />
        ) : (
          <View style={UserProfilePanelStyles(size).AuthSection}>
            {isAuth ? (
              <>
                <Tabulator
                  tabs={FORM_TABS}
                  activeTab={activeFormTab}
                  onSwitchTab={(tab) => {
                    setActiveFormTab(tab);
                  }}
                />
                <View style={UserProfilePanelStyles(size).FormCard}>
                  {Form[activeFormTab.tabId as FormSectionId]}
                </View>
                <Button
                  icon="power-outline"
                  variant="neutral"
                  width="100%"
                  onPress={onOpenPopUp}
                  label="Cerrar sesión"
                />
              </>
            ) : (
              <>
                <Button
                  icon="log-in-outline"
                  variant="primary"
                  width={"100%"}
                  onPress={() => router.navigate("/auth")}
                  label="Iniciar sesión"
                />
                <Link
                  label="¿No tienes una cuenta?"
                  linkLabel="Crea una aquí"
                  href="/auth/signup_screen"
                />
              </>
            )}
          </View>
        )}
      </View>
    </>
  );
};

export default UserProfilePanel;
