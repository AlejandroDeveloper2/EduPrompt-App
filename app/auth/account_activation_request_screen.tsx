import { useTranslations } from "@/shared/hooks/core";

import { AuthTemplate } from "@/features/auth/components/templates";

export default function AccountActivationRequestScreen() {
  const { t } = useTranslations();

  return (
    <AuthTemplate
      title={t("auth-translations.account-activation-request-template.title")}
      titleIcon="bulb-outline"
      form="account-activation-request"
    />
  );
}
