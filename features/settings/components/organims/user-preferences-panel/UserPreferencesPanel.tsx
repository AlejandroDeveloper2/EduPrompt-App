import { useMemo } from "react";
import { View } from "react-native";

import { AppLanguage } from "@/core/types";
import { CleanFrecuencyOption } from "../../../types";

import { APP_LANGUAGES } from "@/shared/constants";
import { AppColors } from "@/shared/styles";
import { CLEAN_FRECUENCY_OPTIONS } from "../../../constants";

import { useUserProfileQuery } from "@/features/settings/hooks/queries";
import { useAnimatedPopUp } from "@/shared/hooks/animations";
import { useTranslations } from "@/shared/hooks/core";
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

  const frecuencyPopUp = useAnimatedPopUp();
  const languagePopUp = useAnimatedPopUp();

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
          "settings-translations.preferences-popups-labels.language.title",
        )}
        isPopUpMounted={languagePopUp.isPopUpMounted}
        gesture={languagePopUp.dragGesture}
        animatedPopUpStyle={languagePopUp.animatedPopUpStyle}
        onClosePopUp={languagePopUp.onClosePopUp}
      >
        <DropdownOptionList<AppLanguage>
          optionList={appLanguages}
          optionIdkey="key"
          optionLabelKey="label"
          searchInputPlaceholder={t(
            "settings-translations.preferences-popups-labels.language.list-search-placeholder",
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
          "settings-translations.preferences-popups-labels.auto-clean-frecuency.title",
        )}
        isPopUpMounted={frecuencyPopUp.isPopUpMounted}
        gesture={frecuencyPopUp.dragGesture}
        animatedPopUpStyle={frecuencyPopUp.animatedPopUpStyle}
        onClosePopUp={frecuencyPopUp.onClosePopUp}
      >
        <DropdownOptionList<CleanFrecuencyOption>
          optionList={cleanFrecuencyOptions}
          optionIdkey="key"
          optionLabelKey="label"
          searchInputPlaceholder={t(
            "settings-translations.preferences-popups-labels.auto-clean-frecuency.list-search-placeholder",
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
                "settings-translations.syncronization-card-labels.title",
              )}
              description={t(
                "settings-translations.syncronization-card-labels.description",
              )}
              buttonData={{
                onPress: syncUserProfile,
                icon: "sync-outline",
                label: t(
                  "settings-translations.syncronization-card-labels.btn-sync",
                ),
                loading: isPending,
                loadingMessage: t(
                  "settings-translations.syncronization-card-labels.loading-text",
                ),
              }}
            />
          )}
        <ScreenSection
          description={t("settings-translations.screen-description")}
          title={t("settings-translations.screen-title")}
          icon="settings-outline"
        />
        {isLoading ? (
          <LoadingTextIndicator
            message={t(
              "settings-translations.module-loading-messages.loading-user-settings-msg",
            )}
            color={AppColors.primary[400]}
          />
        ) : (
          <View style={UserPreferencesPanelStyles.OptionsList}>
            <Switch
              label={t(
                "settings-translations.preferences-options-labels.auto-sync",
              )}
              labelDirection="left"
              state={preferences.autoSync ? "on" : "off"}
              onToggleSwitch={() =>
                updatePreferences({ autoSync: !preferences.autoSync })
              }
            />
            <Switch
              label={t(
                "settings-translations.preferences-options-labels.push-notifications",
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
                "settings-translations.preferences-options-labels.auto-clean-notifications",
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
                  "settings-translations.preferences-options-labels.auto-clean-notifications-frecuency.label",
                )}
                placeholder={t(
                  "settings-translations.preferences-options-labels.auto-clean-notifications-frecuency.placeholder",
                )}
                selectedOption={
                  preferences.cleanFrecuency
                    ? getSelectedFrecuency(preferences.cleanFrecuency)
                    : cleanFrecuencyOptions[0]
                }
                optionValueKey="label"
                displayDropdownOptions={frecuencyPopUp.onOpenPopUp}
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
                "settings-translations.preferences-options-labels.app-language.label",
              )}
              placeholder={t(
                "settings-translations.preferences-options-labels.app-language.placeholder",
              )}
              selectedOption={
                preferences.language
                  ? getSelectedLanguage(preferences.language)
                  : appLanguages[0]
              }
              optionValueKey="label"
              displayDropdownOptions={languagePopUp.onOpenPopUp}
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
