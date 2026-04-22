import { View } from "react-native";

import { AppLanguage } from "@/core/types";
import { CleanFrecuencyOption } from "../../../types";

import { AppColors } from "@/shared/styles";

import { useUserPreferencesLogic } from "@/features/settings/hooks/core";

import { ScreenSection } from "@/shared/components/atoms";
import {
  Dropdown,
  LoadingTextIndicator,
  Switch,
} from "@/shared/components/molecules";

import { styles } from "./UserPreferencesPanel.style";

const UserPreferencesPanel = () => {
  const {
    /** Routing */
    router,
    /** Language */
    t,
    /** Queries */
    isLoading,
    mutate,
    /** Data */
    preferences,
    cleanFrecuencyOptions,
    appLanguages,
    getSelectedFrecuency,
    getSelectedLanguage,
  } = useUserPreferencesLogic();

  return (
    <View style={styles.PanelContainer}>
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
        <View style={styles.OptionsList}>
          <Switch
            label={t(
              "settings_translations.preferences_options_labels.auto_sync",
            )}
            labelDirection="left"
            state={preferences.autoSync ? "on" : "off"}
            onToggleSwitch={() => mutate({ autoSync: !preferences.autoSync })}
          />
          <Switch
            label={t(
              "settings_translations.preferences_options_labels.push_notifications",
            )}
            labelDirection="left"
            state={preferences.pushNotifications ? "on" : "off"}
            onToggleSwitch={() =>
              mutate({
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
              mutate({
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
              displayDropdownOptions={() =>
                router.navigate("/(app)/set_clean_frecuency_sheet")
              }
              clearSelectedOption={() =>
                mutate({
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
            displayDropdownOptions={() =>
              router.navigate("/(app)/set_language_sheet")
            }
            clearSelectedOption={() =>
              mutate({ language: appLanguages[0].key })
            }
          />
        </View>
      )}
    </View>
  );
};

export default UserPreferencesPanel;
