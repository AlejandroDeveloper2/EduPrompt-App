import { useTranslations } from "@/shared/hooks/core";

import { AuthTemplate } from "@/features/auth/components/templates";

export default function RequestPasswordResetScreen() {
  const { t } = useTranslations();
  return (
    <AuthTemplate
      title={t("auth-translations.request-pass-reset-template.title")}
      titleIcon="reload-outline"
      form="request-password-reset"
    />
  );
}
