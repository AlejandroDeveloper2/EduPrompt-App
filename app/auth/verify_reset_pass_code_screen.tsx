import { useTranslations } from "@/shared/hooks/core";

import { AuthTemplate } from "@/features/auth/components/templates";

export default function VerifyResetPassCodeScreen() {
  const { t } = useTranslations();

  return (
    <AuthTemplate
      title={t("auth-translations.reset-pass-verification-code-template.title")}
      titleIcon="pencil-outline"
      form="reset-pass-verification-code"
    />
  );
}
