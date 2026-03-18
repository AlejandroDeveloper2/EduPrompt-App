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
        title={t("marketplace-translations.auth-panel.title")}
        description={t("marketplace-translations.auth-panel.description")}
        icon="bulb-outline"
      />
      <Button
        icon="log-in-outline"
        variant="primary"
        width={"100%"}
        onPress={() => router.navigate("/auth")}
        label={t("settings-translations.user-profile-panel.btn-login")}
      />
      <Link
        label={t("settings-translations.user-profile-panel.signup-link.label")}
        linkLabel={t(
          "settings-translations.user-profile-panel.signup-link.link-label",
        )}
        href="/auth/signup_screen"
      />
    </>
  );
};

export default AuthPanel;
