import { useTranslations } from "@/shared/hooks/core";

import { AuthTemplate } from "@/features/auth/components/templates";

export default function VerifyResetPassCodeScreen() {
  const { t } = useTranslations();

  return (
    <AuthTemplate
      title={t("auth_translations.reset_pass_verification_code_template.title")}
      titleIcon="pencil-outline"
      form="reset-pass-verification-code"
    />
  );
}
