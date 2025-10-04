import { Text, View } from "react-native";

import { UserPreferences } from "@/lib/types/data-types";

import { useUpdateUserPreferences } from "@/lib/hooks/mutations/user";
import { useUserProfileQuery } from "@/lib/hooks/queries/users";

import { ScreenSection } from "@/components/atoms";
import { Switch } from "@/components/molecules";

const UserPreferencesPanel = () => {
  const { data: userProfile, isLoading } = useUserProfileQuery();
  const { mutate } = useUpdateUserPreferences();

  const preferences: UserPreferences = {
    autoSync: userProfile ? userProfile.userPreferences.autoSync : false,
    cleanFrecuency: userProfile
      ? userProfile.userPreferences.cleanFrecuency
      : null,
    pushNotifications: userProfile
      ? userProfile.userPreferences.pushNotifications
      : false,
    autoCleanNotifications: userProfile
      ? userProfile.userPreferences.autoCleanNotifications
      : false,
    language: userProfile ? userProfile.userPreferences.language : "es",
  };

  return (
    <View>
      <ScreenSection
        description="Ajusta tus preferencias como idioma principal de la app,  sincronización automática y notificaciones"
        title="Preferencias de usuario"
        icon="settings-outline"
      />
      {isLoading ? (
        <Text>Cargando ajustes...</Text>
      ) : (
        <View>
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
        </View>
      )}
    </View>
  );
};

export default UserPreferencesPanel;
