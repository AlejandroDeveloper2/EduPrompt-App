import { useTranslations } from "@/shared/hooks/core";

import { AuthTemplate } from "@/features/auth/components/templates";

export default function AccountActivationScreen() {
  const { t } = useTranslations();
  return (
    <AuthTemplate
      title={t("auth-translations.account-activation-template.title")}
      titleIcon="bulb-outline"
      form="account-activation"
    />
  );
}
