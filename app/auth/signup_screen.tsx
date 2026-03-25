import { useTranslations } from "@/shared/hooks/core";

import { AuthTemplate } from "@/features/auth/components/templates";

export default function SignupScreen() {
  const { t } = useTranslations();

  return (
    <AuthTemplate
      title={t("auth_translations.sign_up_template.title")}
      titleIcon="add-outline"
      form="signup"
      hasContiueWithoutAccount
    />
  );
}
