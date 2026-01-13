import { useTranslations } from "@/shared/hooks/core";

import { AuthTemplate } from "@/features/auth/components/templates";

export default function SignupScreen() {
  const { t } = useTranslations();

  return (
    <AuthTemplate
      title={t("auth-translations.sign-up-template.title")}
      titleIcon="add-outline"
      form="signup"
      hasContiueWithoutAccount
    />
  );
}
