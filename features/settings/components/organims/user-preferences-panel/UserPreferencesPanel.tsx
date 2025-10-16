import { View } from "react-native";

import { AppLanguage, CleanFrecuencyOption } from "../../../types";

import { AppColors } from "@/shared/styles";
import { APP_LANGUAGES, CLEAN_FRECUENCY_OPTIONS } from "../../../constants";

import { useEmitUserProfileUpdated } from "@/features/settings/hooks/core";
import { useAnimatedPopUp } from "@/shared/hooks/animations";
import { getFormattedPreferences } from "../../../helpers";
import {
  useUpdateUserPreferences,
  useUserSync,
} from "../../../hooks/mutations";

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
  const { userProfile, isLoading } = useEmitUserProfileUpdated();
  const { mutate } = useUpdateUserPreferences();
  const { syncUserProfile, isPending } = useUserSync();

  const frecuencyPopUp = useAnimatedPopUp();
  const languagePopUp = useAnimatedPopUp();

  const preferences = getFormattedPreferences(userProfile);

  const getSelectedFrecuency = (cleanFrecuency: string) => {
    return CLEAN_FRECUENCY_OPTIONS.filter(
      (frecuency) => frecuency.key === cleanFrecuency
    )[0];
  };

  const getSelectedLanguage = (language: string) => {
    return APP_LANGUAGES.filter((lang) => lang.key === language)[0];
  };

  return (
    <>
      <PopUp
        icon="language-outline"
        title="Elije el idioma de la app"
        isPopUpMounted={languagePopUp.isPopUpMounted}
        gesture={languagePopUp.dragGesture}
        animatedPopUpStyle={languagePopUp.animatedPopUpStyle}
        onClosePopUp={languagePopUp.onClosePopUp}
      >
        <DropdownOptionList<AppLanguage>
          optionList={APP_LANGUAGES}
          optionIdkey="key"
          optionLabelKey="label"
          searchInputPlaceholder="Buscar idioma"
          selectedOption={
            preferences.language
              ? getSelectedLanguage(preferences.language)
              : APP_LANGUAGES[0]
          }
          onSelectOption={(option) => mutate({ language: option.key })}
        />
      </PopUp>
      <PopUp
        icon="timer-outline"
        title="Elije la frecuencia de limpieza"
        isPopUpMounted={frecuencyPopUp.isPopUpMounted}
        gesture={frecuencyPopUp.dragGesture}
        animatedPopUpStyle={frecuencyPopUp.animatedPopUpStyle}
        onClosePopUp={frecuencyPopUp.onClosePopUp}
      >
        <DropdownOptionList<CleanFrecuencyOption>
          optionList={CLEAN_FRECUENCY_OPTIONS}
          optionIdkey="key"
          optionLabelKey="label"
          searchInputPlaceholder="Buscar frecuencia de limpieza"
          selectedOption={
            preferences.cleanFrecuency
              ? getSelectedFrecuency(preferences.cleanFrecuency)
              : CLEAN_FRECUENCY_OPTIONS[0]
          }
          onSelectOption={(option) => mutate({ cleanFrecuency: option.key })}
        />
      </PopUp>

      <View style={UserPreferencesPanelStyles.PanelContainer}>
        {userProfile &&
          !userProfile.sync &&
          !userProfile.userPreferences.autoSync && (
            <InfoCard
              title="Sincronización de datos"
              description="Hay datos sin sincronizar toca el siguiente botón para sincronizar tus datos"
              buttonData={{
                onPress: syncUserProfile,
                icon: "sync-outline",
                label: "Sincronizar",
                loading: isPending,
                loadingMessage: "Sincronizando datos...",
              }}
            />
          )}
        <ScreenSection
          description="Ajusta tus preferencias como idioma principal de la app,  sincronización automática y notificaciones"
          title="Preferencias de usuario"
          icon="settings-outline"
        />
        {isLoading ? (
          <LoadingTextIndicator
            message="Cargando ajustes..."
            color={AppColors.primary[400]}
          />
        ) : (
          <View style={UserPreferencesPanelStyles.OptionsList}>
            <Switch
              label="Sincronización automática de datos"
              labelDirection="left"
              state={preferences.autoSync ? "on" : "off"}
              onToggleSwitch={() => mutate({ autoSync: !preferences.autoSync })}
            />
            <Switch
              label="Notificaciones push"
              labelDirection="left"
              state={preferences.pushNotifications ? "on" : "off"}
              onToggleSwitch={() =>
                mutate({ pushNotifications: !preferences.pushNotifications })
              }
            />
            <Switch
              label="Limpieza automática de notificaciones"
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
                label="Frecuencia de limpieza de notificaciones (Dias)"
                placeholder="Seleccione una opción"
                selectedOption={
                  preferences.cleanFrecuency
                    ? getSelectedFrecuency(preferences.cleanFrecuency)
                    : CLEAN_FRECUENCY_OPTIONS[0]
                }
                optionValueKey="label"
                displayDropdownOptions={frecuencyPopUp.onOpenPopUp}
                clearSelectedOption={() =>
                  mutate({ cleanFrecuency: CLEAN_FRECUENCY_OPTIONS[0].key })
                }
              />
            )}
            <Dropdown<{ language: string }, AppLanguage>
              name="language"
              icon="language-outline"
              label="Idioma"
              placeholder="Seleccione una opción"
              selectedOption={
                preferences.language
                  ? getSelectedLanguage(preferences.language)
                  : APP_LANGUAGES[0]
              }
              optionValueKey="label"
              displayDropdownOptions={languagePopUp.onOpenPopUp}
              clearSelectedOption={() =>
                mutate({ language: APP_LANGUAGES[0].key })
              }
            />
          </View>
        )}
      </View>
    </>
  );
};

export default UserPreferencesPanel;
