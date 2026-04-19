import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { View } from "react-native";

import { Tab } from "@/core/types";
import { FormSectionComponentMap, FormSectionId } from "./types";

import { eventBus } from "@/core/events/EventBus";

import { FORM_TABS } from "./constants";

import {
  useCheckNetwork,
  usePopUp,
  useTranslations,
} from "@/shared/hooks/core";
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

import { dynamicStyles } from "./UserProfilePanel.style";

const UserProfilePanel = () => {
  const { t } = useTranslations();

  const tabs = useMemo(() => FORM_TABS(t), [t]);

  const [activeFormTab, setActiveFormTab] = useState<Tab>(tabs[0]);

  const router = useRouter();

  const isAuth = useEventBusValue("auth.authenticated", false);
  const loading = useEventBusToggle("auth.logout.started", [
    "auth.logout.completed",
    "auth.logout.failed",
  ]);

  const { isConnected } = useCheckNetwork();
  const size = useScreenDimensionsStore();

  const { isOpen, closePopUp, openPopUp } = usePopUp();

  const styles = useMemo(() => dynamicStyles(size), [size]);

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
          "settings_translations.user_profile_panel.close_session_alert_labels.title",
        )}
        isOpen={isOpen}
        onClose={closePopUp}
      >
        <Alert
          variant="danger"
          message={t(
            "settings_translations.user_profile_panel.close_session_alert_labels.message",
          )}
          acceptButtonLabel={t(
            "settings_translations.user_profile_panel.close_session_alert_labels.btn_accept",
          )}
          loading={loading}
          loadingMessage={t(
            "settings_translations.user_profile_panel.close_session_alert_labels.closing_session_msg",
          )}
          acceptButtonIcon="power-outline"
          onCancel={closePopUp}
          onAccept={() => eventBus.emit("auth.logout.requested", undefined)}
        />
      </PopUp>
      <View style={styles.PanelContainer}>
        <ScreenSection
          description={t(
            "settings_translations.user_profile_panel.description",
          )}
          title={t("settings_translations.user_profile_panel.title")}
          icon="person-outline"
        />
        {!isConnected ? (
          <NoConnectionIndicator
            message={t(
              "settings_translations.user_profile_panel.no_connection_indicator_msg",
            )}
          />
        ) : (
          <View style={styles.AuthSection}>
            {isAuth ? (
              <>
                <Tabulator
                  tabs={tabs}
                  activeTab={activeFormTab}
                  onSwitchTab={(tab) => {
                    setActiveFormTab(tab);
                  }}
                />
                <View style={styles.FormCard}>
                  {Form[activeFormTab.tabId as FormSectionId]}
                </View>
                <Button
                  icon="power-outline"
                  variant="neutral"
                  width="100%"
                  onPress={openPopUp}
                  label={t(
                    "settings_translations.user_profile_panel.btn_close_session",
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
                    "settings_translations.user_profile_panel.btn_login",
                  )}
                />
                <Link
                  label={t(
                    "settings_translations.user_profile_panel.signup_link.label",
                  )}
                  linkLabel={t(
                    "settings_translations.user_profile_panel.signup_link.link_label",
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
