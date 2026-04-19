import { useRouter } from "expo-router";
import { View } from "react-native";

import { useTranslations } from "@/shared/hooks/core";

import { Spacing } from "@/shared/styles";

import { Link, ScreenSection } from "@/shared/components/atoms";
import { Button } from "@/shared/components/molecules";

interface AuthPanelProps {
  closePopUp: () => void;
}

const AuthPanel = ({ closePopUp }: AuthPanelProps) => {
  const router = useRouter();
  const { t } = useTranslations();

  return (
    <View
      style={{
        width: "100%",
        gap: Spacing.spacing_lg,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <ScreenSection
        description={t("marketplace_translations.auth_panel.description")}
        icon="bulb-outline"
      />
      <Button
        icon="log-in-outline"
        variant="primary"
        width={"100%"}
        onPress={() => {
          closePopUp();
          router.navigate("/auth");
        }}
        label={t("settings_translations.user_profile_panel.btn_login")}
      />
      <Link
        label={t("settings_translations.user_profile_panel.signup_link.label")}
        linkLabel={t(
          "settings_translations.user_profile_panel.signup_link.link_label",
        )}
        href="/auth/signup_screen"
      />
    </View>
  );
};

export default AuthPanel;
