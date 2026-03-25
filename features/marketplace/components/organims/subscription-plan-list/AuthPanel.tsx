import { useRouter } from "expo-router";

import { useTranslations } from "@/shared/hooks/core";

import { Link, ScreenSection } from "@/shared/components/atoms";
import { Button } from "@/shared/components/molecules";

const AuthPanel = () => {
  const router = useRouter();
  const { t } = useTranslations();

  return (
    <>
      <ScreenSection
        title={t("marketplace_translations.auth_panel.title")}
        description={t("marketplace_translations.auth_panel.description")}
        icon="bulb-outline"
      />
      <Button
        icon="log-in-outline"
        variant="primary"
        width={"100%"}
        onPress={() => router.navigate("/auth")}
        label={t("settings_translations.user_profile_panel.btn_login")}
      />
      <Link
        label={t("settings_translations.user_profile_panel.signup_link.label")}
        linkLabel={t(
        "settings_translations.user_profile_panel.signup_link.link_label",
        )}
        href="/auth/signup_screen"
      />
    </>
  );
};

export default AuthPanel;
