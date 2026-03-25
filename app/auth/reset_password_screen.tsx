import { useTranslations } from "@/shared/hooks/core";

import { AuthTemplate } from "@/features/auth/components/templates";

export default function ResetPasswordScreen() {
  const { t } = useTranslations();
  return (
    <AuthTemplate
      title={t("auth_translations.reset_password_template.title")}
      titleIcon="pencil-outline"
      form="reset-password"
    />
  );
}
