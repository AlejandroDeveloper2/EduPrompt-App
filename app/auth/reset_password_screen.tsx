import { useTranslations } from "@/shared/hooks/core";

import { AuthTemplate } from "@/features/auth/components/templates";

export default function ResetPasswordScreen() {
  const { t } = useTranslations();
  return (
    <AuthTemplate
      title={t("auth-translations.reset-password-template.title")}
      titleIcon="pencil-outline"
      form="reset-password"
    />
  );
}
