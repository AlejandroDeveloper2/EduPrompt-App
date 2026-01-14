import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import { Tab } from "@/core/types";
import { FormSectionComponentMap, FormSectionId } from "./types";

import { eventBus } from "@/core/events/EventBus";

import { FORM_TABS } from "./constants";

import { useAnimatedPopUp } from "@/shared/hooks/animations";
import { useCheckNetwork, useTranslations } from "@/shared/hooks/core";
import { useEventBusToggle } from "@/shared/hooks/events";
import useEventBusValue from "@/shared/hooks/events/useEventbusValue";
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

  const isAuth = useEventBusValue("auth.authenticated", false);
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

  const { t } = useTranslations();

  const Form: FormSectionComponentMap = {
    "tab-1": <UpdateUsernameForm />,
    "tab-2": <UserEmailForm />,
    "tab-3": <ChangePasswordForm />,
  };

  return (
    <>
      <PopUp
        icon="information-circle-outline"
        title={t(
          "settings-translations.user-profile-panel.close-session-alert-labels.title"
        )}
        isPopUpMounted={isPopUpMounted}
        gesture={dragGesture}
        animatedPopUpStyle={animatedPopUpStyle}
        onClosePopUp={onClosePopUp}
      >
        <Alert
          variant="danger"
          message={t(
            "settings-translations.user-profile-panel.close-session-alert-labels.message"
          )}
          acceptButtonLabel={t(
            "settings-translations.user-profile-panel.close-session-alert-labels.btn-accept"
          )}
          loading={loading}
          loadingMessage={t(
            "settings-translations.user-profile-panel.close-session-alert-labels.closing-session-msg"
          )}
          acceptButtonIcon="power-outline"
          onCancel={onClosePopUp}
          onAccept={() => eventBus.emit("auth.logout.requested", undefined)}
        />
      </PopUp>
      <View style={UserProfilePanelStyles(size).PanelContainer}>
        <ScreenSection
          description={t(
            "settings-translations.user-profile-panel.description"
          )}
          title={t("settings-translations.user-profile-panel.title")}
          icon="person-outline"
        />
        {!isConnected ? (
          <NoConnectionIndicator
            message={t(
              "settings-translations.user-profile-panel.no-connection-indicator-msg"
            )}
          />
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
                  label={t(
                    "settings-translations.user-profile-panel.btn-close-session"
                  )}
                />
              </>
            ) : (
              <>
                <Button
                  icon="log-in-outline"
                  variant="primary"
                  width={"100%"}
                  onPress={() => router.navigate("/auth")}
                  label={t(
                    "settings-translations.user-profile-panel.btn-login"
                  )}
                />
                <Link
                  label={t(
                    "settings-translations.user-profile-panel.signup-link.label"
                  )}
                  linkLabel={t(
                    "settings-translations.user-profile-panel.signup-link.link-label"
                  )}
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
