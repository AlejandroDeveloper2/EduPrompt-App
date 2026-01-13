import { useTranslations } from "@/shared/hooks/core";

import { AuthTemplate } from "@/features/auth/components/templates";

export default function LoginScreen() {
  const { t } = useTranslations();

  return (
    <AuthTemplate
      title={t("auth-translations.login-template.title")}
      titleIcon="log-in-outline"
      form="login"
      hasContiueWithoutAccount
    />
  );
}
