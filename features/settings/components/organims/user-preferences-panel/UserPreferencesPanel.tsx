import { useMemo } from "react";
import { View } from "react-native";

import { AppLanguage } from "@/core/types";
import { CleanFrecuencyOption } from "../../../types";

import { APP_LANGUAGES } from "@/shared/constants";
import { AppColors } from "@/shared/styles";
import { CLEAN_FRECUENCY_OPTIONS } from "../../../constants";

import { useUserProfileQuery } from "@/features/settings/hooks/queries";
import { usePopUp, useTranslations } from "@/shared/hooks/core";
import { useEventbusValue } from "@/shared/hooks/events";
import { useUpdatePreferences } from "../../../hooks/core";
import { useUserSyncMutation } from "../../../hooks/mutations";

import { getFormattedPreferences } from "../../../helpers";

import { ScreenSection } from "@/shared/components/atoms";
import {
  Dropdown,
  InfoCard,
  LoadingTextIndicator,
  Switch,
} from "@/shared/components/molecules";
import { DropdownOptionList, PopUp } from "@/shared/components/organims";

import { UserPreferencesPanelStyles } from "./UserPreferencesPanel.style";

const UserPreferencesPanel = () => {
  const { userProfile, isLoading } = useUserProfileQuery();
  const isAuthenticated = useEventbusValue("auth.authenticated", false);

  const { updatePreferences } = useUpdatePreferences();
  const { syncUserProfile, isPending } = useUserSyncMutation();

  const frecuencyPopUp = usePopUp();
  const languagePopUp = usePopUp();

  const { t, setLanguage } = useTranslations();

  const appLanguages = useMemo(() => APP_LANGUAGES(t), [t]);
  const cleanFrecuencyOptions = useMemo(() => CLEAN_FRECUENCY_OPTIONS(t), [t]);

  const preferences = getFormattedPreferences(userProfile);

  const getSelectedFrecuency = (cleanFrecuency: string) => {
    return cleanFrecuencyOptions.filter(
      (frecuency) => frecuency.key === cleanFrecuency,
    )[0];
  };

  const getSelectedLanguage = (language: string) => {
    return appLanguages.filter((lang) => lang.key === language)[0];
  };

  return (
    <>
      <PopUp
        icon="language-outline"
        title={t(
          "settings_translations.preferences_popups_labels.language.title",
        )}
        isOpen={languagePopUp.isOpen}
        onClose={languagePopUp.closePopUp}
      >
        <DropdownOptionList<AppLanguage>
          optionList={appLanguages}
          optionIdkey="key"
          optionLabelKey="label"
          searchInputPlaceholder={t(
            "settings_translations.preferences_popups_labels.language.list_search_placeholder",
          )}
          selectedOption={
            preferences.language
              ? getSelectedLanguage(preferences.language)
              : appLanguages[0]
          }
          onSelectOption={(option) => {
            setLanguage(option.key);
            updatePreferences({ language: option.key });
          }}
        />
      </PopUp>
      <PopUp
        icon="timer-outline"
        title={t(
          "settings_translations.preferences_popups_labels.auto_clean_frecuency.title",
        )}
        isOpen={frecuencyPopUp.isOpen}
        onClose={frecuencyPopUp.closePopUp}
      >
        <DropdownOptionList<CleanFrecuencyOption>
          optionList={cleanFrecuencyOptions}
          optionIdkey="key"
          optionLabelKey="label"
          searchInputPlaceholder={t(
            "settings_translations.preferences_popups_labels.auto_clean_frecuency.list_search_placeholder",
          )}
          selectedOption={
            preferences.cleanFrecuency
              ? getSelectedFrecuency(preferences.cleanFrecuency)
              : cleanFrecuencyOptions[0]
          }
          onSelectOption={(option) =>
            updatePreferences({ cleanFrecuency: option.key })
          }
        />
      </PopUp>

      <View style={UserPreferencesPanelStyles.PanelContainer}>
        {userProfile &&
          !userProfile.sync &&
          !userProfile.userPreferences.autoSync &&
          isAuthenticated && (
            <InfoCard
              title={t(
                "settings_translations.syncronization_card_labels.title",
              )}
              description={t(
                "settings_translations.syncronization_card_labels.description",
              )}
              buttonData={{
                onPress: syncUserProfile,
                icon: "sync-outline",
                label: t(
                  "settings_translations.syncronization_card_labels.btn_sync",
                ),
                loading: isPending,
                loadingMessage: t(
                  "settings_translations.syncronization_card_labels.loading_text",
                ),
              }}
            />
          )}
        <ScreenSection
          description={t("settings_translations.screen_description")}
          title={t("settings_translations.screen_title")}
          icon="settings-outline"
        />
        {isLoading ? (
          <LoadingTextIndicator
            message={t(
              "settings_translations.module_loading_messages.loading_user_settings_msg",
            )}
            color={AppColors.primary[400]}
          />
        ) : (
          <View style={UserPreferencesPanelStyles.OptionsList}>
            <Switch
              label={t(
                "settings_translations.preferences_options_labels.auto_sync",
              )}
              labelDirection="left"
              state={preferences.autoSync ? "on" : "off"}
              onToggleSwitch={() =>
                updatePreferences({ autoSync: !preferences.autoSync })
              }
            />
            <Switch
              label={t(
                "settings_translations.preferences_options_labels.push_notifications",
              )}
              labelDirection="left"
              state={preferences.pushNotifications ? "on" : "off"}
              onToggleSwitch={() =>
                updatePreferences({
                  pushNotifications: !preferences.pushNotifications,
                })
              }
            />
            <Switch
              label={t(
                "settings_translations.preferences_options_labels.auto_clean_notifications",
              )}
              labelDirection="left"
              state={preferences.autoCleanNotifications ? "on" : "off"}
              onToggleSwitch={() =>
                updatePreferences({
                  autoCleanNotifications: !preferences.autoCleanNotifications,
                })
              }
            />
            {preferences.autoCleanNotifications && (
              <Dropdown<{ cleanFrecuency: string }, CleanFrecuencyOption>
                name="cleanFrecuency"
                icon="timer-outline"
                label={t(
                  "settings_translations.preferences_options_labels.auto_clean_notifications_frecuency.label",
                )}
                placeholder={t(
                  "settings_translations.preferences_options_labels.auto_clean_notifications_frecuency.placeholder",
                )}
                selectedOption={
                  preferences.cleanFrecuency
                    ? getSelectedFrecuency(preferences.cleanFrecuency)
                    : cleanFrecuencyOptions[0]
                }
                optionValueKey="label"
                displayDropdownOptions={frecuencyPopUp.openPopUp}
                clearSelectedOption={() =>
                  updatePreferences({
                    cleanFrecuency: cleanFrecuencyOptions[0].key,
                  })
                }
              />
            )}
            <Dropdown<{ language: string }, AppLanguage>
              name="language"
              icon="language-outline"
              label={t(
                "settings_translations.preferences_options_labels.app_language.label",
              )}
              placeholder={t(
                "settings_translations.preferences_options_labels.app_language.placeholder",
              )}
              selectedOption={
                preferences.language
                  ? getSelectedLanguage(preferences.language)
                  : appLanguages[0]
              }
              optionValueKey="label"
              displayDropdownOptions={languagePopUp.openPopUp}
              clearSelectedOption={() =>
                updatePreferences({ language: appLanguages[0].key })
              }
            />
          </View>
        )}
      </View>
    </>
  );
};

export default UserPreferencesPanel;
