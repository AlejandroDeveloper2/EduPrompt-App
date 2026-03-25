import { useTranslations } from "@/shared/hooks/core";

import { AuthTemplate } from "@/features/auth/components/templates";

export default function RequestPasswordResetScreen() {
  const { t } = useTranslations();
  return (
    <AuthTemplate
      title={t("auth_translations.request_pass_reset_template.title")}
      titleIcon="reload-outline"
      form="request-password-reset"
    />
  );
}
